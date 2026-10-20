import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Server-only helpers for abuse prevention and signed unsubscribe tokens.
 * `FORM_SECRET` must be set in production; in development a fixed fallback
 * keeps the flows testable.
 */
function secret() {
  const s = process.env.FORM_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("FORM_SECRET is not configured");
  }
  return "development-only-secret-do-not-use-in-production";
}

export function hasFormSecret() {
  return Boolean(process.env.FORM_SECRET && process.env.FORM_SECRET.length >= 16) || process.env.NODE_ENV !== "production";
}

/** Best-effort client address from common proxy headers. */
export function clientAddress(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Salted, one-way hash of an address; stored on submissions for rate limiting only. */
export function hashAddress(address: string) {
  return createHmac("sha256", secret()).update(`ip:${address}`).digest("hex").slice(0, 32);
}

/* ---------------------------------------------------------------------------
 * Rate limiting
 *
 * Two layers: a fast in-memory window (protects a single instance from bursts)
 * and a persistence-backed count (the Sanity dataset is shared by all
 * instances, so counting recent submissions per hashed address works across a
 * multi-instance deployment without introducing another service).
 * ------------------------------------------------------------------------- */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function memoryLimit(key: string, limit: number, windowMs: number, now = Date.now()) {
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  existing.count += 1;
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  return { allowed: existing.count <= limit, remaining: Math.max(0, limit - existing.count) };
}

/* ---------------------------------------------------------------------------
 * Unsubscribe tokens: HMAC(email) so a link can be included in any future
 * mailing without storing per-subscriber secrets.
 * ------------------------------------------------------------------------- */
export function unsubscribeToken(email: string) {
  const normalized = email.trim().toLowerCase();
  const sig = createHmac("sha256", secret()).update(`unsub:${normalized}`).digest("base64url");
  return `${Buffer.from(normalized).toString("base64url")}.${sig}`;
}

export function verifyUnsubscribeToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  let email: string;
  try {
    email = Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const expected = createHmac("sha256", secret()).update(`unsub:${email}`).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return email;
}
