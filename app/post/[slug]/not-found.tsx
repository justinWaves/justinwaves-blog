import { Button } from "@/components/ui/Button";
import { releaseDetail } from "@/lib/content/copy";

export default function ReleaseNotFound() {
  const c = releaseDetail.notFound;
  return (
    <section className="container-site flex min-h-[70svh] flex-col items-center justify-center pt-[var(--header-height)] text-center" aria-labelledby="release-missing-title">
      <h1 id="release-missing-title" className="page-heading text-ivory">
        {c.title}
      </h1>
      <p className="mt-4 max-w-[44ch] text-muted">{c.body}</p>
      <div className="mt-8">
        <Button href={c.action.href}>{c.action.label}</Button>
      </div>
    </section>
  );
}
