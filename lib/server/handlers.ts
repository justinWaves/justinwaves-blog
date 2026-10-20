import "server-only";
import type { SanityClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { commentSchema, looksAutomated, readJson, subscribeSchema, unsubscribeSchema } from "@/lib/validation/forms";
import { clientAddress, hashAddress, memoryLimit, verifyUnsubscribeToken } from "./security";
import { createComment, recentSubmissionCount, unsubscribeEmail, upsertSubscriber } from "./submissions";

/**
 * Route handler bodies, written against an injected write client so they can
 * be unit-tested with a mock and never touch the production dataset in tests.
 */

type Deps = { getClient: () => SanityClient | null };

const json = (body: Record<string, unknown>, status: number) => NextResponse.json(body, { status });

const WINDOW_MS = 10 * 60 * 1000;

type Guard = { ok: false; response: NextResponse } | { ok: true; client: SanityClient; ipHash: string };

async function guard(request: Request, deps: Deps, scope: string, memoryLimitCount: number, storeLimitCount: number): Promise<Guard> {
  const client = deps.getClient();
  if (!client) return { ok: false, response: json({ ok: false, message: "Service unavailable." }, 503) };

  const ipHash = hashAddress(clientAddress(request));
  const mem = memoryLimit(`${scope}:${ipHash}`, memoryLimitCount, WINDOW_MS);
  if (!mem.allowed) return { ok: false, response: json({ ok: false, message: "Too many requests. Please try again later." }, 429) };

  let recent = 0;
  try {
    recent = await recentSubmissionCount(client, ipHash, WINDOW_MS);
  } catch {
    // If the count fails we still have the in-memory limit; continue.
  }
  if (recent >= storeLimitCount) {
    return { ok: false, response: json({ ok: false, message: "Too many requests. Please try again later." }, 429) };
  }
  return { ok: true, client, ipHash };
}

export async function handleSubscribe(request: Request, deps: Deps): Promise<NextResponse> {
  const body = await readJson(request);
  if (body === null) return json({ ok: false, message: "Invalid request." }, 400);
  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    const emailIssue = parsed.error.issues.some((i) => i.path[0] === "email");
    return json({ ok: false, message: emailIssue ? "Enter a valid email address." : "Invalid request.", field: emailIssue ? "email" : undefined }, 400);
  }
  if (looksAutomated(parsed.data)) {
    // Quietly accept to avoid teaching bots; nothing is stored.
    return json({ ok: true }, 202);
  }
  const g = await guard(request, deps, "subscribe", 5, 8);
  if (!g.ok) return g.response;
  try {
    await upsertSubscriber(g.client, parsed.data, g.ipHash);
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[subscribe] failed", error instanceof Error ? error.message : error);
    return json({ ok: false, message: "We couldn't add you right now." }, 502);
  }
}

export async function handleComment(request: Request, deps: Deps): Promise<NextResponse> {
  const body = await readJson(request);
  if (body === null) return json({ ok: false, message: "Invalid request." }, 400);
  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "");
    return json({ ok: false, message: "Please check the form and try again.", field }, 400);
  }
  if (looksAutomated(parsed.data)) return json({ ok: true }, 202);
  const g = await guard(request, deps, "comment", 3, 5);
  if (!g.ok) return g.response;
  try {
    await createComment(g.client, parsed.data, g.ipHash);
    return json({ ok: true }, 201);
  } catch (error) {
    console.error("[comment] failed", error instanceof Error ? error.message : error);
    return json({ ok: false, message: "We couldn't send your note." }, 502);
  }
}

export async function handleUnsubscribe(request: Request, deps: Deps): Promise<NextResponse> {
  const body = await readJson(request);
  if (body === null) return json({ ok: false, message: "Invalid request." }, 400);

  // Token path (from a mailing link) or plain email path (from the site form).
  let email: string | null = null;
  if (typeof (body as { token?: unknown }).token === "string") {
    email = verifyUnsubscribeToken((body as { token: string }).token);
    if (!email) return json({ ok: false, message: "Invalid unsubscribe link.", reason: "token" }, 400);
  } else {
    const parsed = unsubscribeSchema.safeParse(body);
    if (!parsed.success) return json({ ok: false, message: "Enter a valid email address.", field: "email" }, 400);
    if (looksAutomated(parsed.data)) return json({ ok: true }, 202);
    email = parsed.data.email;
  }

  const g = await guard(request, deps, "unsubscribe", 5, 10);
  if (!g.ok) return g.response;
  try {
    await unsubscribeEmail(g.client, email);
    // Neutral response regardless of whether the address existed.
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[unsubscribe] failed", error instanceof Error ? error.message : error);
    return json({ ok: false, message: "We couldn't process that right now." }, 502);
  }
}

export function methodNotAllowed() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
