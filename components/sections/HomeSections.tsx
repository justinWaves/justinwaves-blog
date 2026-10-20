import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { home } from "@/lib/content/copy";
import { merch, merchEnabled } from "@/lib/content/merch";
import { videos, watchEnabled } from "@/lib/content/media";
import { formatShowDate, splitShows, type Show } from "@/lib/content/shows";
import { BOOKING_EMAIL, mailto } from "@/lib/content/site";
import type { Release } from "@/lib/sanity/releases";
import { ReleaseGrid } from "./ReleaseCard";
import { ShowList } from "./ShowList";
import { WatchPlayer } from "./WatchPlayer";
import { MailingList } from "./MailingList";

export function MusicCatalog({ releases, emptyMessage }: { releases: readonly Release[]; emptyMessage: string }) {
  const c = home.music;
  return (
    <Section pad="lg" id="music" ariaLabelledby="music-title" className="scroll-mt-[var(--header-height)]">
      <div className="flex items-end justify-between gap-6">
        <h2 id="music-title" className="section-label">
          {c.heading}
        </h2>
        <Button href={c.all.href} variant="link" className="shrink-0 whitespace-nowrap">
          {c.all.label}
        </Button>
      </div>
      <div className="mt-8">
        {releases.length ? <ReleaseGrid releases={releases} priorityCount={3} columns={3} /> : <p className="text-muted">{emptyMessage}</p>}
      </div>
    </Section>
  );
}

export function MerchSection() {
  if (!merchEnabled()) return null;
  const c = home.merch;
  if (merch.products.length === 0 && merch.shopUrl) {
    return (
      <Section pad="lg" id="merch" ariaLabelledby="merch-title" className="border-t rule scroll-mt-[var(--header-height)]">
        <h2 id="merch-title" className="section-label">
          {c.heading}
        </h2>
        <div className="mt-8">
          <Button href={merch.shopUrl} icon>
            {c.shop}
          </Button>
        </div>
      </Section>
    );
  }
  return (
    <Section pad="lg" id="merch" ariaLabelledby="merch-title" className="border-t rule scroll-mt-[var(--header-height)]">
      <h2 id="merch-title" className="section-label">
        {c.heading}
      </h2>
      <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {merch.products.map((product) => (
          <li key={product.id}>
            <a href={product.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="image-frame rounded-none">
                <img src={product.image.src} alt={product.image.alt} width={product.image.width} height={product.image.height} className="h-auto w-full" loading="lazy" decoding="async" />
              </div>
              <p className="mt-4 font-sans text-base text-ivory group-hover:text-copper-bright">{product.name}</p>
              {product.price ? <p className="mt-1 text-sm text-muted">{product.price}</p> : null}
              <span className="mt-2 inline-flex text-sm text-ivory/80 group-hover:text-ivory">{c.buy}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LiveDates({ shows }: { shows: readonly Show[] }) {
  const upcoming = splitShows(shows).upcoming;
  if (!upcoming.length) return null;
  const c = home.live;
  return (
    <Section pad="lg" id="live" ariaLabelledby="live-title" className="border-t rule scroll-mt-[var(--header-height)]">
      <div className="flex items-end justify-between gap-6">
        <h2 id="live-title" className="section-label">
          {c.heading}
        </h2>
        <Button href={c.all.href} variant="link" className="shrink-0 whitespace-nowrap">
          {c.all.label}
        </Button>
      </div>
      <div className="mt-8">
        <ShowList shows={upcoming.map((s) => ({ ...s, past: false }))} ticketsLabel={c.tickets} formatDate={formatShowDate} />
      </div>
    </Section>
  );
}

export function WatchSection() {
  if (!watchEnabled()) return null;
  const video = videos[0];
  if (!video) return null;
  return (
    <Section pad="lg" id="watch" ariaLabelledby="watch-title" className="border-t rule scroll-mt-[var(--header-height)]">
      <h2 id="watch-title" className="section-label">
        {home.watch.heading}
      </h2>
      <div className="mt-8">
        <WatchPlayer youtubeId={video.youtubeId} title={video.title} />
      </div>
    </Section>
  );
}

export function ContactSection() {
  const c = home.contact;
  return (
    <Section pad="lg" id="contact" ariaLabelledby="contact-title" className="border-t rule scroll-mt-[var(--header-height)]">
      <h2 id="contact-title" className="section-label">
        {c.heading}
      </h2>
      <p className="mt-6 text-sm text-muted">{c.label}</p>
      <a href={mailto()} className="mt-2 inline-flex min-h-11 items-center text-lg text-ivory hover:text-copper-bright break-all">
        {BOOKING_EMAIL}
      </a>
    </Section>
  );
}

export { MailingList };
