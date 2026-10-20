import "server-only";
import type { SanityClient } from "@sanity/client";
import { recentSubmissionsByIpQuery, subscriberByEmailQuery } from "@/lib/sanity/queries";
import type { CommentInput, SubscribeInput } from "@/lib/validation/forms";

export const CONSENT_VERSION = "2026-10";

/** Shared-store rate check: how many submissions from this hashed address recently? */
export async function recentSubmissionCount(client: SanityClient, ipHash: string, windowMs: number) {
  const since = new Date(Date.now() - windowMs).toISOString();
  const count = await client.fetch<number>(recentSubmissionsByIpQuery, { ipHash, since });
  return typeof count === "number" ? count : 0;
}

export async function createComment(client: SanityClient, input: CommentInput, ipHash: string) {
  return client.create({
    _type: "comment",
    post: { _type: "reference", _ref: input.postId },
    name: input.name,
    email: input.email,
    comment: input.comment,
    approved: false,
    ipHash,
  });
}

/**
 * Subscribe or safely re-activate. The response is identical whether the
 * address was new, already active, or previously unsubscribed, so the endpoint
 * cannot be used to probe who is on the list.
 */
export async function upsertSubscriber(client: SanityClient, input: SubscribeInput, ipHash: string) {
  const existing = await client.fetch<{ _id: string; status?: string }[]>(subscriberByEmailQuery, { email: input.email });
  const now = new Date().toISOString();
  const first = existing[0];
  if (first) {
    await client
      .patch(first._id)
      .set({
        status: "active",
        ...(input.name ? { name: input.name } : {}),
        consentVersion: CONSENT_VERSION,
        consentAt: now,
        source: input.source ?? "other",
      })
      .unset(["unsubscribedAt"])
      .commit();
    return { created: false };
  }
  await client.create({
    _type: "emails",
    email: input.email,
    ...(input.name ? { name: input.name } : {}),
    status: "active",
    consentVersion: CONSENT_VERSION,
    consentAt: now,
    source: input.source ?? "other",
    ipHash,
  });
  return { created: true };
}

export async function unsubscribeEmail(client: SanityClient, email: string) {
  const existing = await client.fetch<{ _id: string }[]>(subscriberByEmailQuery, { email: email.toLowerCase() });
  const now = new Date().toISOString();
  await Promise.all(
    existing.map((doc) => client.patch(doc._id).set({ status: "unsubscribed", unsubscribedAt: now }).commit()),
  );
  return { matched: existing.length };
}
