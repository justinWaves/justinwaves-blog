import { describe, expect, it } from "vitest";
import { commentSchema, looksAutomated, MIN_FORM_FILL_MS, readJson, subscribeSchema, unsubscribeSchema } from "@/lib/validation/forms";

describe("subscribeSchema", () => {
  it("normalises a valid email and accepts optional fields", () => {
    const result = subscribeSchema.safeParse({ email: "  Fan@Example.COM ", name: " Sam ", source: "home" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("fan@example.com");
      expect(result.data.name).toBe("Sam");
    }
  });

  it("rejects malformed emails and unknown sources", () => {
    expect(subscribeSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
    expect(subscribeSchema.safeParse({ email: "a@b.co", source: "newsletter" }).success).toBe(false);
  });

  it("rejects an over-long name", () => {
    expect(subscribeSchema.safeParse({ email: "a@b.co", name: "x".repeat(81) }).success).toBe(false);
  });

  it("rejects a filled honeypot at the schema level", () => {
    expect(subscribeSchema.safeParse({ email: "a@b.co", website: "http://spam" }).success).toBe(false);
  });
});

describe("commentSchema", () => {
  const valid = { postId: "abc123-def", name: "Ada", email: "ada@example.com", comment: "Lovely record." };

  it("accepts a complete comment", () => {
    expect(commentSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ["postId", { postId: "<script>" }],
    ["postId too short", { postId: "abc" }],
    ["empty comment", { comment: "   " }],
    ["comment too long", { comment: "x".repeat(2001) }],
    ["missing name", { name: "" }],
    ["bad email", { email: "nope" }],
  ])("rejects %s", (_label, override) => {
    expect(commentSchema.safeParse({ ...valid, ...override }).success).toBe(false);
  });
});

describe("unsubscribeSchema", () => {
  it("requires only an email", () => {
    expect(unsubscribeSchema.safeParse({ email: "X@Y.io" }).success).toBe(true);
    expect(unsubscribeSchema.safeParse({}).success).toBe(false);
  });
});

describe("looksAutomated", () => {
  const now = 1_700_000_000_000;

  it("flags a filled honeypot", () => {
    expect(looksAutomated({ website: "x" }, now)).toBe(true);
  });

  it("flags a submission faster than the minimum fill time", () => {
    expect(looksAutomated({ startedAt: now - (MIN_FORM_FILL_MS - 1) }, now)).toBe(true);
  });

  it("passes a plausible human submission", () => {
    expect(looksAutomated({ website: "", startedAt: now - 30_000 }, now)).toBe(false);
  });

  it("passes when no timing information is available", () => {
    expect(looksAutomated({}, now)).toBe(false);
  });
});

describe("readJson", () => {
  const make = (body: string, type = "application/json") =>
    new Request("http://localhost/x", { method: "POST", headers: { "content-type": type }, body });

  it("parses JSON bodies", async () => {
    await expect(readJson(make('{"a":1}'))).resolves.toEqual({ a: 1 });
  });

  it("returns null for non-JSON content types", async () => {
    await expect(readJson(make("a=1", "application/x-www-form-urlencoded"))).resolves.toBeNull();
  });

  it("returns null for malformed JSON and oversized bodies", async () => {
    await expect(readJson(make("{nope"))).resolves.toBeNull();
    await expect(readJson(make(JSON.stringify({ a: "x".repeat(17_000) })))).resolves.toBeNull();
  });
});
