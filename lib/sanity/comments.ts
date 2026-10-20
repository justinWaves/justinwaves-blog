import { z } from "zod";
import { readClient } from "./client";
import { revalidate } from "./config";
import { approvedCommentsQuery } from "./queries";

/** Public comment shape. No email, no moderation metadata. */
export type PublicComment = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

const rawCommentSchema = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  name: z.string().min(1),
  comment: z.string().min(1),
});

export function projectComments(input: unknown): PublicComment[] {
  if (!Array.isArray(input)) return [];
  const out: PublicComment[] = [];
  for (const item of input) {
    const parsed = rawCommentSchema.safeParse(item);
    if (!parsed.success) continue;
    out.push({
      id: parsed.data._id,
      name: parsed.data.name.trim(),
      comment: parsed.data.comment.trim(),
      createdAt: parsed.data._createdAt,
    });
  }
  return out;
}

export async function getApprovedComments(postId: string): Promise<PublicComment[]> {
  try {
    const data = await readClient.fetch<unknown>(
      approvedCommentsQuery,
      { postId },
      { next: { revalidate: revalidate.comments, tags: [`comments:${postId}`] } },
    );
    return projectComments(data);
  } catch {
    return [];
  }
}
