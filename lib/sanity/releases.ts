import { z } from "zod";
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { readClient } from "./client";
import { revalidate } from "./config";
import { artworkUrl } from "./image";
import { releaseBySlugQuery, releaseSlugsQuery, releasesQuery } from "./queries";
import { sanitizeEmbed, type SanitizedEmbed } from "./embed";
import { releaseEditorial } from "@/lib/content/releases";

/* ---------------------------------------------------------------------------
 * Raw CMS shapes (lenient — any optional field may be missing or malformed)
 * ------------------------------------------------------------------------- */
const imageSchema = z
  .object({
    asset: z
      .object({
        _id: z.string().optional(),
        url: z.string().url().optional(),
        lqip: z.string().optional(),
        dimensions: z.object({ width: z.number(), height: z.number() }).partial().optional(),
      })
      .nullable()
      .optional(),
    hotspot: z.unknown().optional(),
    crop: z.unknown().optional(),
  })
  .nullable()
  .optional();

const rawCardSchema = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
  slug: z.string().min(1),
  mainImage: imageSchema,
});

const rawDetailSchema = rawCardSchema.extend({
  purchaseEmbed: z.string().nullable().optional().catch(null),
  embed: z.string().nullable().optional(),
  body: z.array(z.unknown()).nullable().optional(),
});

type RawCard = z.infer<typeof rawCardSchema>;
type RawDetail = z.infer<typeof rawDetailSchema>;

/* ---------------------------------------------------------------------------
 * Public release model used by the UI
 * ------------------------------------------------------------------------- */
export type ReleaseArtwork = {
  /** Square artwork URL at the requested size. */
  src: (size: number) => string;
  lqip?: string;
  alt: string;
};

export type Release = {
  id: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  artists: readonly string[];
  /** "Justin Waves" or "Justin Waves & Kaeli Renae" */
  billing: string;
  releaseDate?: string;
  releaseYear?: number;
  label?: string;
  credits?: readonly string[];
  bandcampUrl?: string;
  primaryPlatform?: { name: string; url: string };
  artwork?: ReleaseArtwork;
  bodyKind?: "lyrics" | "notes";
  /** Milliseconds; newest first. */
  sortKey: number;
};

export type ReleaseDetail = Release & {
  purchaseEmbed: SanitizedEmbed | null;
  embed: SanitizedEmbed | null;
  body: PortableTextBlock[];
};

function blockText(block: PortableTextBlock): string {
  const children = (block as { children?: { text?: string }[] }).children;
  return (children ?? []).map((c) => c.text ?? "").join("");
}

/** Infer lyrics when editorial didn't specify and the body is mostly short lines. */
export function resolveBodyKind(release: ReleaseDetail): "lyrics" | "notes" | null {
  if (!release.body.length) return null;
  if (release.bodyKind) return release.bodyKind;
  const lines = release.body.map(blockText).filter((t) => t.trim().length > 0);
  if (lines.length < 4) return "notes";
  const short = lines.filter((t) => t.length < 90 && !/[.]{1} /.test(t));
  return short.length / lines.length >= 0.7 ? "lyrics" : "notes";
}

function billingFor(artists: readonly string[]) {
  if (artists.length <= 1) return artists[0] ?? "Justin Waves";
  if (artists.length === 2) return `${artists[0]} & ${artists[1]}`;
  return `${artists.slice(0, -1).join(", ")} & ${artists[artists.length - 1]}`;
}

function toArtwork(raw: RawCard["mainImage"], title: string): ReleaseArtwork | undefined {
  if (!raw?.asset?.url) return undefined;
  const assetId = raw.asset._id;
  const url = raw.asset.url;
  const source = { asset: { _ref: assetId ?? "" }, hotspot: raw.hotspot, crop: raw.crop } as SanityImageSource;
  return {
    src: (size: number) => (assetId ? artworkUrl(source, size) : `${url}?w=${size}&h=${size}&fit=crop&auto=format`),
    lqip: raw.asset.lqip,
    alt: `${title} — release artwork`,
  };
}

export function adaptRelease(raw: RawCard): Release {
  const editorial = releaseEditorial[raw.slug];
  const artists = editorial?.artists ?? ["Justin Waves"];
  const releaseDate = editorial?.releaseDate ?? (raw.publishedAt ? raw.publishedAt.slice(0, 10) : undefined);
  // Verified release date first; otherwise the CMS creation time (ordering only — never displayed).
  const sortKey = releaseDate ? Date.parse(releaseDate) : Date.parse(raw._createdAt);

  return {
    id: raw._id,
    slug: raw.slug,
    href: `/post/${raw.slug}`,
    title: raw.title.trim(),
    description: editorial ? (editorial.description ?? "") : (raw.description?.trim() ?? ""),
    bodyKind: editorial?.bodyKind,
    artists,
    billing: billingFor(artists),
    releaseDate,
    releaseYear: releaseDate ? Number(releaseDate.slice(0, 4)) : undefined,
    label: editorial?.label,
    credits: editorial?.credits,
    bandcampUrl: editorial?.bandcampUrl,
    primaryPlatform: editorial?.primaryPlatform,
    artwork: toArtwork(raw.mainImage, raw.title),
    sortKey: Number.isFinite(sortKey) ? sortKey : 0,
  };
}

export function adaptReleaseDetail(raw: RawDetail): ReleaseDetail {
  const base = adaptRelease(raw);
  return {
    ...base,
    purchaseEmbed: sanitizeEmbed(raw.purchaseEmbed, base.title, "purchase"),
    embed: sanitizeEmbed(raw.embed, base.title),
    body: (raw.body ?? []).filter((b): b is PortableTextBlock => !!b && typeof b === "object" && "_type" in b),
  };
}

/** Parse a list of raw documents, dropping malformed records instead of failing. */
export function adaptReleaseList(input: unknown): Release[] {
  if (!Array.isArray(input)) return [];
  const releases: Release[] = [];
  for (const item of input) {
    const parsed = rawCardSchema.safeParse(item);
    if (parsed.success) releases.push(adaptRelease(parsed.data));
  }
  return [...releases].sort((a, b) => b.sortKey - a.sortKey);
}

/* ---------------------------------------------------------------------------
 * Data access (server)
 * ------------------------------------------------------------------------- */
export async function getReleases(): Promise<Release[]> {
  try {
    const data = await readClient.fetch(releasesQuery, {}, { next: { revalidate: revalidate.releases, tags: ["releases"] } });
    return adaptReleaseList(data);
  } catch (error) {
    console.error("[sanity] releases unavailable", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getReleaseSlugs(): Promise<string[]> {
  try {
    const data = await readClient.fetch<unknown>(releaseSlugsQuery, {}, { next: { revalidate: revalidate.releases } });
    return Array.isArray(data) ? data.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export async function getReleaseBySlug(slug: string): Promise<ReleaseDetail | null> {
  try {
    const data = await readClient.fetch<unknown>(
      releaseBySlugQuery,
      { slug },
      { next: { revalidate: revalidate.release, tags: ["releases", `release:${slug}`] } },
    );
    const parsed = rawDetailSchema.safeParse(data);
    if (!parsed.success) return null;
    return adaptReleaseDetail(parsed.data);
  } catch (error) {
    console.error("[sanity] release unavailable", slug, error instanceof Error ? error.message : error);
    return null;
  }
}

/** The featured catalog item: the most recent release with artwork. */
export function pickFeaturedRelease(releases: readonly Release[]): Release | undefined {
  return releases.find((r) => r.artwork) ?? releases[0];
}
