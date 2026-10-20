import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactSection, LiveDates, MerchSection, MusicCatalog, WatchSection, MailingList } from "@/components/sections/HomeSections";
import { music, pageMeta } from "@/lib/content/copy";
import { shows } from "@/lib/content/shows";
import { getReleases } from "@/lib/sanity/releases";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageMeta.home, path: "" });

export default async function HomePage() {
  const releases = await getReleases();

  return (
    <>
      <Hero />
      <MusicCatalog releases={releases} emptyMessage={music.empty} />
      <MerchSection />
      <LiveDates shows={shows} />
      <WatchSection />
      <MailingList source="home" />
      <ContactSection />
    </>
  );
}
