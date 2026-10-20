"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { utility } from "@/lib/content/copy";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const c = utility.error;
  return (
    <section className="container-site flex min-h-[70svh] flex-col items-center justify-center pt-[var(--header-height)] text-center" aria-labelledby="error-title">
      <h1 id="error-title" className="page-heading text-ivory">
        {c.title}
      </h1>
      <p className="mt-4 text-muted">{c.body}</p>
      <div className="mt-8">
        <Button onClick={reset}>{c.retry}</Button>
      </div>
    </section>
  );
}
