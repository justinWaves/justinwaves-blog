"use client";

import { useId, useState, type FormEvent } from "react";
import { comments } from "@/lib/content/copy";
import { Honeypot, StatusMessage, TextArea, TextField } from "./Field";
import { useFormSubmit } from "./useFormSubmit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CommentForm({ postId }: { postId: string }) {
  const id = useId();
  const { status, submit } = useFormSubmit("/api/comment");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const comment = String(data.get("comment") ?? "").trim();
    const website = String(data.get("website") ?? "");

    const next: Record<string, string | null> = {};
    if (!name) next.name = "Please add your name.";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!comment) next.comment = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setServerMessage(null);

    const result = await submit({ postId, name, email, comment, website });
    if (!result.ok) {
      if (result.field && ["name", "email", "comment"].includes(result.field)) {
        setErrors({ [result.field]: result.field === "email" ? "Enter a valid email address." : "Please check this field." });
      } else {
        setServerMessage(comments.error);
      }
    }
  }

  if (status === "success") {
    return <StatusMessage tone="success">{comments.success}</StatusMessage>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id={`${id}-name`} name="name" label={comments.name} autoComplete="name" required maxLength={80} error={errors.name} />
        <TextField
          id={`${id}-email`}
          name="email"
          type="email"
          label={comments.email}
          autoComplete="email"
          required
          hint={comments.emailHelper}
          error={errors.email}
        />
      </div>
      <TextArea id={`${id}-comment`} name="comment" label={comments.message} required maxLength={2000} error={errors.comment} />
      <div>
        <button
          type="submit"
          disabled={status === "pending"}
          className="inline-flex min-h-12 items-center justify-center rounded-none border border-ivory/40 px-6 font-mono text-sm uppercase tracking-[0.04em] font-medium text-ivory transition-colors hover:border-ivory hover:bg-ivory/5 disabled:opacity-70"
        >
          {status === "pending" ? comments.pending : comments.button}
        </button>
        {serverMessage ? <StatusMessage tone="error">{serverMessage}</StatusMessage> : null}
      </div>
    </form>
  );
}
