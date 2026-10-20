import { Button } from "@/components/ui/Button";
import { utility } from "@/lib/content/copy";

export default function NotFound() {
  const c = utility.notFound;
  return (
    <section className="container-site flex min-h-[80svh] flex-col items-center justify-center pt-[var(--header-height)] text-center" aria-labelledby="nf-title">
      <h1 id="nf-title" className="page-heading text-ivory">
        {c.title}
      </h1>
      <p className="mt-4 max-w-[44ch] text-muted">{c.body}</p>
      <div className="mt-8">
        <Button href={c.action.href}>{c.action.label}</Button>
      </div>
    </section>
  );
}
