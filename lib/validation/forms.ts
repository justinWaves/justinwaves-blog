import { z } from "zod";

const trimmed = (max: number) => z.string().trim().min(1).max(max);

/** Honeypot + timing fields shared by both public forms. */
const spamFields = {
  /** Must stay empty; bots tend to fill every field. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Client timestamp (ms) when the form rendered; too-fast submits are rejected. */
  startedAt: z.coerce.number().int().positive().optional(),
};

export const emailSchema = z.string().trim().toLowerCase().email().max(254);

export const subscribeSchema = z.object({
  email: emailSchema,
  name: z.string().trim().max(80).optional().or(z.literal("")),
  source: z.enum(["home", "live", "music", "footer", "other"]).optional(),
  ...spamFields,
});
export type SubscribeInput = z.infer<typeof subscribeSchema>;

export const commentSchema = z.object({
  postId: z.string().trim().regex(/^[a-zA-Z0-9_.-]{6,120}$/),
  name: trimmed(80),
  email: emailSchema,
  comment: trimmed(2000),
  ...spamFields,
});
export type CommentInput = z.infer<typeof commentSchema>;

export const unsubscribeSchema = z.object({
  email: emailSchema,
  ...spamFields,
});

export const MIN_FORM_FILL_MS = 2500;

/** Returns true when the submission looks automated. */
export function looksAutomated(input: { website?: string; startedAt?: number }, now = Date.now()) {
  if (input.website && input.website.length > 0) return true;
  if (typeof input.startedAt === "number" && now - input.startedAt < MIN_FORM_FILL_MS) return true;
  return false;
}

/** Parse a JSON body safely; returns null for malformed input. */
export async function readJson(request: Request): Promise<unknown | null> {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return null;
  try {
    const text = await request.text();
    if (text.length > 16_000) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}
