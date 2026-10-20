import type { MetadataRoute } from "next";
import { legacySlugs } from "@/lib/content/releases";
import { siteUrl } from "@/lib/content/site";
import { getReleases } from "@/lib/sanity/releases";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const releases = await getReleases();
  const releaseSlugs = new Set<string>([...legacySlugs, ...releases.map((r) => r.slug)]);

  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/music`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/live`, changeFrequency: "weekly", priority: 0.8 },
  ];

  for (const slug of releaseSlugs) {
    const release = releases.find((r) => r.slug === slug);
    pages.push({
      url: `${siteUrl}/post/${slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
      ...(release?.releaseDate ? { lastModified: new Date(release.releaseDate) } : {}),
    });
  }

  return pages;
}
