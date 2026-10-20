import { CommentForm } from "@/components/forms/CommentForm";
import { comments as copy } from "@/lib/content/copy";
import type { PublicComment } from "@/lib/sanity/comments";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

/** Quiet, moderated notes below the release story. */
export function CommentsSection({ postId, comments }: { postId: string; comments: PublicComment[] }) {
  return (
    <section aria-labelledby="notes-title" className="border-t rule pt-12">
      <h2 id="notes-title" className="display-sm text-ivory">
        {copy.heading}
      </h2>
      <div className="mt-8">
        <CommentForm postId={postId} />
      </div>
      {comments.length ? (
        <ul className="mt-12 divide-y rule border-t rule" role="list" aria-label={copy.listHeading}>
          {comments.map((c) => (
            <li key={c.id} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-ivory">{c.name}</p>
                <time dateTime={c.createdAt} className="text-xs text-muted">
                  {formatDate(c.createdAt)}
                </time>
              </div>
              <p className="mt-2 whitespace-pre-line text-muted">{c.comment}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
