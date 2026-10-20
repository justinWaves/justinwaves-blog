import type { Metadata } from "next";
import { platforms, SITE_NAME, siteUrl } from "@/lib/content/site";
import type { Release } from "@/lib/sanity/releases";

export function pageMetadata(input: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${siteUrl}${input.path}`;
  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      type: "website",
      ...(input.image ? { images: [{ url: input.image, alt: input.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(input.image ? { images: [input.image] } : {}),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `${siteUrl}/#artist`,
    name: SITE_NAME,
    url: siteUrl,
    sameAs: platforms.map((p) => p.href),
    image: `${siteUrl}/media/og/default.jpg`,
  };
}

export function musicRecordingJsonLd(release: Release) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: release.title,
    url: `${siteUrl}${release.href}`,
    byArtist: release.artists.map((name) => ({ "@type": "MusicGroup", name })),
  };
  if (release.releaseDate) data.datePublished = release.releaseDate;
  if (release.artwork) data.image = release.artwork.src(1200);
  if (release.description) data.description = release.description;
  if (release.label) data.recordLabel = { "@type": "Organization", name: release.label };
  const sameAs = [release.bandcampUrl, release.primaryPlatform?.url].filter((u): u is string => Boolean(u));
  if (sameAs.length) data.sameAs = Array.from(new Set(sameAs));
  return data;
}
