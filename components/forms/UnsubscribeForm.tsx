"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { unsubscribe } from "@/lib/content/copy";
import { Honeypot, StatusMessage, TextField } from "./Field";
import { useFormSubmit } from "./useFormSubmit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function UnsubscribeForm({ token }: { token?: string }) {
  const id = useId();
  const { status, submit } = useFormSubmit("/api/unsubscribe");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const tokenHandled = useRef(false);

  // A signed link from a mailing: process it once on load.
  useEffect(() => {
    if (!token || tokenHandled.current) return;
    tokenHandled.current = true;
    submit({ token }).then((result) => {
      if (result.ok) setMessage({ tone: "success", text: unsubscribe.tokenSuccess });
      else setMessage({ tone: "error", text: unsubscribe.tokenInvalid });
    });
  }, [token, submit]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "");
    if (!EMAIL_RE.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError(null);
    const result = await submit({ email, website });
    setMessage(result.ok ? { tone: "success", text: unsubscribe.success } : { tone: "error", text: unsubscribe.error });
  }

  if (message?.tone === "success") {
    return <StatusMessage tone="success">{message.text}</StatusMessage>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <Honeypot />
      <TextField id={`${id}-email`} name="email" type="email" label="Email address" autoComplete="email" required error={emailError} />
      <button
        type="submit"
        disabled={status === "pending"}
        className="inline-flex min-h-12 items-center justify-center rounded-none border border-ivory/40 px-6 font-mono text-sm uppercase tracking-[0.04em] font-medium text-ivory hover:border-ivory hover:bg-ivory/5 disabled:opacity-70"
      >
        {status === "pending" ? unsubscribe.pending : unsubscribe.button}
      </button>
      {message ? (
        <div className="sm:col-span-2">
          <StatusMessage tone={message.tone}>{message.text}</StatusMessage>
        </div>
      ) : null}
    </form>
  );
}
