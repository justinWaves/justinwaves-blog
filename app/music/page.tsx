import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { ReleaseGrid } from "@/components/sections/ReleaseCard";
import { Section } from "@/components/ui/Section";
import { music, pageMeta } from "@/lib/content/copy";
import { getReleases } from "@/lib/sanity/releases";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageMeta.music, path: "/music" });

export default async function MusicPage() {
  const releases = await getReleases();

  return (
    <>
      <PageIntro title={music.h1} />
      <Section pad="none" ariaLabelledby="catalog-title" className="pb-[clamp(3rem,6vw,6rem)]">
        <h2 id="catalog-title" className="sr-only">
          Releases
        </h2>
        {releases.length ? <ReleaseGrid releases={releases} priorityCount={3} columns={3} /> : <p className="text-muted">{music.empty}</p>}
      </Section>
    </>
  );
}
