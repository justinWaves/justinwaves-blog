import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleComment, handleSubscribe, handleUnsubscribe, methodNotAllowed } from "@/lib/server/handlers";
import { unsubscribeToken } from "@/lib/server/security";
import { CONSENT_VERSION } from "@/lib/server/submissions";
import { createMockClient, humanTiming, jsonRequest } from "./mocks/sanity-client";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("handleSubscribe", () => {
  it("stores a new subscriber with consent metadata and no raw IP", async () => {
    const mock = createMockClient();
    const res = await handleSubscribe(
      jsonRequest({ email: "Fan@Example.com", name: "Sam", source: "home", ...humanTiming() }, { ip: "203.0.113.10" }),
      { getClient: () => mock.client },
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    expect(mock.created).toHaveLength(1);
    const doc = mock.created[0]!;
    expect(doc).toMatchObject({ _type: "emails", email: "fan@example.com", name: "Sam", status: "active", source: "home", consentVersion: CONSENT_VERSION });
    expect(typeof doc.consentAt).toBe("string");
    expect(typeof doc.ipHash).toBe("string");
    expect(JSON.stringify(doc)).not.toContain("203.0.113.10");
  });

  it("re-activates an existing subscriber instead of duplicating, with a neutral response", async () => {
    const mock = createMockClient({
      fetch: (query) => (query.includes("count(") ? 0 : [{ _id: "emails.existing", status: "unsubscribed" }]),
    });
    const res = await handleSubscribe(jsonRequest({ email: "fan@example.com", ...humanTiming() }), { getClient: () => mock.client });
    expect(res.status).toBe(200);
    expect(mock.created).toHaveLength(0);
    expect(mock.patches).toHaveLength(1);
    expect(mock.patches[0]).toMatchObject({ id: "emails.existing", set: { status: "active" }, unset: ["unsubscribedAt"] });
  });

  it("returns 400 with a field hint for an invalid email", async () => {
    const mock = createMockClient();
    const res = await handleSubscribe(jsonRequest({ email: "nope", ...humanTiming() }), { getClient: () => mock.client });
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ ok: false, field: "email" });
    expect(mock.created).toHaveLength(0);
  });

  it("returns 400 for a non-JSON body", async () => {
    const mock = createMockClient();
    const res = await handleSubscribe(jsonRequest("email=a@b.co", { contentType: "text/plain" }), { getClient: () => mock.client });
    expect(res.status).toBe(400);
  });

  it("quietly accepts bot-like submissions without storing anything", async () => {
    const mock = createMockClient();
    const tooFast = await handleSubscribe(jsonRequest({ email: "bot@example.com", startedAt: Date.now() - 100 }), { getClient: () => mock.client });
    expect(tooFast.status).toBe(202);
    expect(mock.created).toHaveLength(0);
    expect(mock.fetch).not.toHaveBeenCalled();
  });

  it("returns 503 when no write client is configured", async () => {
    const res = await handleSubscribe(jsonRequest({ email: "a@b.co", ...humanTiming() }), { getClient: () => null });
    expect(res.status).toBe(503);
  });

  it("returns 429 when the shared store shows too many recent submissions", async () => {
    const mock = createMockClient({ fetch: (query) => (query.includes("count(") ? 50 : []) });
    const res = await handleSubscribe(jsonRequest({ email: "a@b.co", ...humanTiming() }), { getClient: () => mock.client });
    expect(res.status).toBe(429);
    expect(mock.created).toHaveLength(0);
  });

  it("returns 429 after repeated bursts from one address (in-memory limiter)", async () => {
    const mock = createMockClient();
    const ip = "198.51.100.77";
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await handleSubscribe(jsonRequest({ email: `a${i}@b.co`, ...humanTiming() }, { ip }), { getClient: () => mock.client });
      statuses.push(res.status);
    }
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses[5]).toBe(429);
  });

  it("returns 502 when the write fails", async () => {
    const mock = createMockClient();
    mock.create.mockRejectedValueOnce(new Error("boom"));
    const res = await handleSubscribe(jsonRequest({ email: "a@b.co", ...humanTiming() }), { getClient: () => mock.client });
    expect(res.status).toBe(502);
  });
});

describe("handleComment", () => {
  const valid = { postId: "post-abc-123", name: "Ada", email: "ada@example.com", comment: "Beautiful.", ...humanTiming() };

  it("creates an unapproved comment referencing the post", async () => {
    const mock = createMockClient();
    const res = await handleComment(jsonRequest(valid), { getClient: () => mock.client });
    expect(res.status).toBe(201);
    expect(mock.created[0]).toMatchObject({
      _type: "comment",
      approved: false,
      name: "Ada",
      comment: "Beautiful.",
      post: { _type: "reference", _ref: "post-abc-123" },
    });
  });

  it("rejects invalid input with the offending field", async () => {
    const mock = createMockClient();
    const res = await handleComment(jsonRequest({ ...valid, comment: "" }), { getClient: () => mock.client });
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ ok: false, field: "comment" });
  });

  it("drops honeypot submissions", async () => {
    const mock = createMockClient();
    const res = await handleComment(jsonRequest({ ...valid, website: "http://spam.example" }), { getClient: () => mock.client });
    // The honeypot fails schema validation (400) or is silently accepted (202);
    // either way nothing is stored.
    expect([202, 400]).toContain(res.status);
    expect(mock.created).toHaveLength(0);
  });

  it("returns 503 without a configured client", async () => {
    const res = await handleComment(jsonRequest(valid), { getClient: () => null });
    expect(res.status).toBe(503);
  });
});

describe("handleUnsubscribe", () => {
  it("marks every matching subscriber document unsubscribed", async () => {
    const mock = createMockClient({
      fetch: (query) => (query.includes("count(") ? 0 : [{ _id: "emails.1" }, { _id: "emails.2" }]),
    });
    const res = await handleUnsubscribe(jsonRequest({ email: "Fan@Example.com", ...humanTiming() }), { getClient: () => mock.client });
    expect(res.status).toBe(200);
    expect(mock.patches.map((p) => p.id)).toEqual(["emails.1", "emails.2"]);
    expect(mock.patches[0]?.set).toMatchObject({ status: "unsubscribed" });
  });

  it("responds identically when the address is unknown (no roster probing)", async () => {
    const mock = createMockClient();
    const res = await handleUnsubscribe(jsonRequest({ email: "unknown@example.com", ...humanTiming() }), { getClient: () => mock.client });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("accepts a signed token from a mailing link", async () => {
    const mock = createMockClient({ fetch: (query) => (query.includes("count(") ? 0 : [{ _id: "emails.9" }]) });
    const res = await handleUnsubscribe(jsonRequest({ token: unsubscribeToken("Fan@Example.com") }), { getClient: () => mock.client });
    expect(res.status).toBe(200);
    expect(mock.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ email: "fan@example.com" }));
  });

  it("rejects a tampered token", async () => {
    const mock = createMockClient();
    const token = unsubscribeToken("fan@example.com").replace(/.$/, (c) => (c === "A" ? "B" : "A"));
    const res = await handleUnsubscribe(jsonRequest({ token }), { getClient: () => mock.client });
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ reason: "token" });
    expect(mock.patches).toHaveLength(0);
  });
});

describe("methodNotAllowed", () => {
  it("returns 405 with an Allow header", () => {
    const res = methodNotAllowed();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
  });
});
