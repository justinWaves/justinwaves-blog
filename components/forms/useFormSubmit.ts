"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SubmitStatus = "idle" | "pending" | "success" | "error";

export type SubmitResult = { ok: true } | { ok: false; message?: string; field?: string };

/**
 * Shared submit helper: posts JSON, treats non-2xx as failure, and reports
 * a server-provided field error when present. Includes anti-spam fields.
 */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  // Record when the form became interactive (used by the server's timing check).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submit = useCallback(
    async (payload: Record<string, unknown>): Promise<SubmitResult> => {
      setStatus("pending");
      setFieldError(null);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({ ...payload, startedAt: startedAt.current }),
        });
        let data: { ok?: boolean; message?: string; field?: string } = {};
        try {
          data = (await response.json()) as typeof data;
        } catch {
          data = {};
        }
        if (!response.ok || data.ok === false) {
          setStatus("error");
          if (data.field) setFieldError(data.field);
          return { ok: false, message: data.message, field: data.field };
        }
        setStatus("success");
        return { ok: true };
      } catch {
        setStatus("error");
        return { ok: false };
      }
    },
    [endpoint],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setFieldError(null);
  }, []);

  return { status, fieldError, submit, reset };
}
