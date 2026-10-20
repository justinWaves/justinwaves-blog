import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full min-h-12 rounded-none border rule bg-ink-deep px-4 text-ivory placeholder:text-muted/60 focus:border-ivory/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-copper-bright transition-colors";

export function TextField({
  label,
  id,
  hint,
  error,
  className = "",
  ...rest
}: ComponentProps<"input"> & { label: string; id: string; hint?: ReactNode; error?: string | null }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={`${control} ${error ? "border-copper-bright" : ""}`}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-muted/80">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-copper-bright">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea({
  label,
  id,
  error,
  className = "",
  ...rest
}: ComponentProps<"textarea"> & { label: string; id: string; error?: string | null }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`${control} min-h-36 resize-y py-3 ${error ? "border-copper-bright" : ""}`}
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-copper-bright">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Honeypot field: visually hidden, ignored by people, filled by bots. */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function StatusMessage({ tone, children }: { tone: "success" | "error"; children: ReactNode }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`mt-4 flex items-start gap-2 text-sm ${tone === "success" ? "text-ivory" : "text-copper-bright"}`}
    >
      <span aria-hidden="true" className={`mt-[0.45em] inline-block size-1.5 shrink-0 rounded-full ${tone === "success" ? "bg-mist" : "bg-copper-bright"}`} />
      <span>{children}</span>
    </p>
  );
}
