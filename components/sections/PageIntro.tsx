import type { ReactNode } from "react";

export function PageIntro({ title, intro, children, compact = false }: { title: ReactNode; intro?: string; children?: ReactNode; compact?: boolean }) {
  return (
    <header className="container-site pt-[calc(var(--header-height)+2.25rem)] pb-8 md:pb-10">
      <p className="eyebrow mb-5">Justin Waves / Independent archive</p>
      <h1 className={compact ? "display-md font-bold uppercase text-ivory" : "page-heading text-ivory"}>{title}</h1>
      {intro ? <p className="mt-3 max-w-xl text-muted">{intro}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
