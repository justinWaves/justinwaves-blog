import type { Metadata } from "next";
import { MailingList } from "@/components/sections/MailingList";
import { PageIntro } from "@/components/sections/PageIntro";
import { ShowList } from "@/components/sections/ShowList";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { live, pageMeta } from "@/lib/content/copy";
import { photos } from "@/lib/content/media";
import { formatShowDate, shows, visibleShows } from "@/lib/content/shows";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageMeta.live, path: "/live" });

export default function LivePage() {
  const visible = visibleShows(shows);

  return (
    <>
      <PageIntro title={live.h1} />

      <Section pad="none" ariaLabelledby="dates-title" className="pb-[clamp(3rem,6vw,6rem)]">
        <h2 id="dates-title" className="sr-only">
          Dates
        </h2>
        {visible.length === 0 ? (
          <div>
            <p className="text-muted">{live.datesEmpty}</p>
            <div className="mt-6">
              <Button href={live.subscribe.href} variant="link">
                {live.subscribe.label}
              </Button>
            </div>
          </div>
        ) : (
          <ShowList shows={visible} ticketsLabel={live.tickets} pastBadge={live.pastBadge} formatDate={formatShowDate} />
        )}
      </Section>

      <Section pad="sm" className="border-t rule">
        <div className="image-frame w-full rounded-none">
          <img
            src={photos.pianoShore.src}
            srcSet={photos.pianoShore.srcSet}
            sizes="100vw"
            width={photos.pianoShore.width}
            height={photos.pianoShore.height}
            alt={photos.pianoShore.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>
      </Section>

      <MailingList source="live" />
    </>
  );
}
