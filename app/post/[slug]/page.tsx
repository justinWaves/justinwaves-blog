import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/brand/Icons";
import { ReleaseMedia } from "@/components/sections/ReleaseMedia";
import { CommentsSection } from "@/components/sections/CommentsSection";
import { ReleaseArtworkImage, ReleaseGrid } from "@/components/sections/ReleaseCard";
import { ReleaseStory } from "@/components/sections/ReleaseStory";
import { Section } from "@/components/ui/Section";
import { releaseDetail } from "@/lib/content/copy";
import { legacySlugs } from "@/lib/content/releases";
import { siteUrl } from "@/lib/content/site";
import { getApprovedComments } from "@/lib/sanity/comments";
import { getReleaseBySlug, getReleases, getReleaseSlugs, resolveBodyKind } from "@/lib/sanity/releases";
import { musicRecordingJsonLd } from "@/lib/seo";

type Params = { slug: string };

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  const fromCms = await getReleaseSlugs();
  const slugs = new Set([...legacySlugs, ...fromCms]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const release = await getReleaseBySlug(slug);
  if (!release) return { title: releaseDetail.notFound.title, robots: { index: false } };
  const title = `${release.title} | Justin Waves`;
  const description = release.description || `${release.title} by ${release.billing}.`;
  const url = `${siteUrl}${release.href}`;
  const image = release.artwork?.src(1200);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "music.song",
      ...(image ? { images: [{ url: image, width: 1200, height: 1200, alt: release.artwork?.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

function formatReleaseDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

export default async function ReleasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const release = await getReleaseBySlug(slug);
  if (!release) notFound();

  const [comments, all] = await Promise.all([getApprovedComments(release.id), getReleases()]);
  const related = all.filter((r) => r.slug !== release.slug).slice(0, 4);

  const meta: { label: string; value: string }[] = [
    { label: releaseDetail.labels.artists, value: release.artists.join(", ") },
  ];
  if (release.label) meta.push({ label: releaseDetail.labels.label, value: release.label });
  if (release.releaseDate) meta.push({ label: releaseDetail.labels.releaseDate, value: formatReleaseDate(release.releaseDate) });
  if (release.credits?.length) meta.push({ label: releaseDetail.labels.credits, value: release.credits.join(" · ") });

  const bodyKind = resolveBodyKind(release);

  return (
    <article>
      <div className="container-site pt-[calc(var(--header-height)+clamp(1.5rem,4vw,3rem))]">
        <Link href="/music" className="inline-flex min-h-10 items-center gap-2 text-sm text-mist hover:text-ivory">
          <ArrowIcon className="size-4 rotate-180" />
          {releaseDetail.back}
        </Link>
      </div>

      <Section pad="sm" ariaLabelledby="release-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="image-frame mx-auto max-w-md rounded-none lg:max-w-none">
              <ReleaseArtworkImage release={release} size={1200} sizes="(min-width: 1024px) 40vw, 90vw" priority />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h1 id="release-title" className="release-title text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.08] text-ivory">
              {release.title}
            </h1>
            <p className="mt-3 text-lg text-muted">{release.billing}</p>
            {release.description ? <p className="mt-5 max-w-[44rem] text-muted">{release.description}</p> : null}

            <dl className="mt-8 grid gap-x-8 gap-y-4 border-t rule pt-6 sm:grid-cols-2">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow">{m.label}</dt>
                  <dd className="mt-1 text-ivory">{m.value}</dd>
                </div>
              ))}
            </dl>

            <ReleaseMedia release={release} />
          </div>
        </div>
      </Section>

      {release.body.length ? (
        <Section pad="sm" ariaLabelledby="story-title">
          <div className="mx-auto max-w-[44rem]">
            <h2 id="story-title" className="section-label">
              {bodyKind === "lyrics" ? releaseDetail.lyricsHeading : releaseDetail.notesHeading}
            </h2>
            <div className="mt-6">
              <ReleaseStory body={release.body} />
            </div>
          </div>
        </Section>
      ) : null}

      <Section pad="sm">
        <div className="mx-auto max-w-[44rem]">
          <CommentsSection postId={release.id} comments={comments} />
        </div>
      </Section>

      {related.length ? (
        <Section pad="lg" ariaLabelledby="related-title" className="border-t rule">
          <h2 id="related-title" className="section-label">
            {releaseDetail.relatedHeading}
          </h2>
          <div className="mt-10">
            <ReleaseGrid releases={related} />
          </div>
        </Section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(musicRecordingJsonLd(release)) }} />
    </article>
  );
}
