"use client";

import { useId, useState, type FormEvent } from "react";
import { mailingList } from "@/lib/content/copy";
import { Honeypot, StatusMessage, TextField } from "./Field";
import { useFormSubmit } from "./useFormSubmit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function MailingListForm({ source = "home", compact = false }: { source?: "home" | "live" | "music" | "footer"; compact?: boolean }) {
  const id = useId();
  const { status, submit } = useFormSubmit("/api/subscribe");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "");

    if (!EMAIL_RE.test(email)) {
      setEmailError(mailingList.invalidEmail);
      return;
    }
    setEmailError(null);
    setServerMessage(null);

    const result = await submit({ email, website, source });
    if (!result.ok) {
      if (result.field === "email") setEmailError(mailingList.invalidEmail);
      else setServerMessage(mailingList.error);
    } else {
      form.reset();
    }
  }

  if (status === "success") {
    return <StatusMessage tone="success">{mailingList.success}</StatusMessage>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot />
      <div className={compact ? "flex flex-col gap-4" : "grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"}>
        <TextField
          id={`${id}-email`}
          name="email"
          type="email"
          label={mailingList.emailLabel}
          autoComplete="email"
          inputMode="email"
          required
          error={emailError}
          onChange={() => emailError && setEmailError(null)}
        />
        <button
          type="submit"
          disabled={status === "pending"}
          className="inline-flex min-h-12 items-center justify-center rounded-none bg-ivory px-6 font-mono text-sm uppercase tracking-[0.04em] font-medium text-ink transition-colors hover:bg-ivory/90 disabled:opacity-70"
        >
          {status === "pending" ? mailingList.pending : mailingList.button}
        </button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted/80">{mailingList.consent}</p>
      {serverMessage ? <StatusMessage tone="error">{serverMessage}</StatusMessage> : null}
    </form>
  );
}
