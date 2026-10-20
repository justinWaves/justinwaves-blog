import { describe, expect, it } from "vitest";
import { clientAddress, hashAddress, memoryLimit, unsubscribeToken, verifyUnsubscribeToken } from "@/lib/server/security";

describe("unsubscribe tokens", () => {
  it("round-trips a normalised email", () => {
    const token = unsubscribeToken("  Fan@Example.COM ");
    expect(verifyUnsubscribeToken(token)).toBe("fan@example.com");
  });

  it("rejects forged, truncated, or malformed tokens", () => {
    const token = unsubscribeToken("fan@example.com");
    const [payload] = token.split(".");
    expect(verifyUnsubscribeToken(`${payload}.not-a-signature`)).toBeNull();
    expect(verifyUnsubscribeToken(payload!)).toBeNull();
    expect(verifyUnsubscribeToken("")).toBeNull();
    expect(verifyUnsubscribeToken("...")).toBeNull();
  });

  it("does not accept a payload swapped onto another signature", () => {
    const a = unsubscribeToken("a@example.com");
    const b = unsubscribeToken("b@example.com");
    const forged = `${a.split(".")[0]}.${b.split(".")[1]}`;
    expect(verifyUnsubscribeToken(forged)).toBeNull();
  });
});

describe("hashAddress", () => {
  it("is deterministic, keyed, and does not reveal the address", () => {
    const h = hashAddress("203.0.113.5");
    expect(h).toBe(hashAddress("203.0.113.5"));
    expect(h).not.toBe(hashAddress("203.0.113.6"));
    expect(h).toHaveLength(32);
    expect(h).not.toContain("203");
  });
});

describe("clientAddress", () => {
  it("prefers the first forwarded address", () => {
    const req = new Request("http://x", { headers: { "x-forwarded-for": "1.1.1.1, 2.2.2.2", "x-real-ip": "3.3.3.3" } });
    expect(clientAddress(req)).toBe("1.1.1.1");
  });

  it("falls back to x-real-ip, then unknown", () => {
    expect(clientAddress(new Request("http://x", { headers: { "x-real-ip": "3.3.3.3" } }))).toBe("3.3.3.3");
    expect(clientAddress(new Request("http://x"))).toBe("unknown");
  });
});

describe("memoryLimit", () => {
  it("allows up to the limit within a window and then blocks", () => {
    const key = `test:${Math.random()}`;
    const now = 1_000_000;
    expect(memoryLimit(key, 2, 1000, now).allowed).toBe(true);
    expect(memoryLimit(key, 2, 1000, now + 10).allowed).toBe(true);
    expect(memoryLimit(key, 2, 1000, now + 20).allowed).toBe(false);
  });

  it("resets after the window elapses", () => {
    const key = `test:${Math.random()}`;
    const now = 5_000_000;
    memoryLimit(key, 1, 1000, now);
    expect(memoryLimit(key, 1, 1000, now + 500).allowed).toBe(false);
    expect(memoryLimit(key, 1, 1000, now + 1001).allowed).toBe(true);
  });
});
