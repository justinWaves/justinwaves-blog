import { describe, expect, it } from "vitest";
import { adaptReleaseDetail, adaptReleaseList, pickFeaturedRelease, resolveBodyKind } from "@/lib/sanity/releases";
import { approvedCommentsQuery, releaseCardFields, releasesQuery } from "@/lib/sanity/queries";
import { legacySlugs } from "@/lib/content/releases";

const asset = {
  _id: "image-abc-1000x1000-jpg",
  url: "https://cdn.sanity.io/images/testproj/test/abc-1000x1000.jpg",
  lqip: "data:image/jpeg;base64,xyz",
  dimensions: { width: 1000, height: 1000 },
};

const doc = (over: Record<string, unknown> = {}) => ({
  _id: "post-1",
  _createdAt: "2024-01-05T10:00:00Z",
  title: "  Above The Clouds ",
  description: "cms description",
  publishedAt: "2024-12-16T00:00:00Z",
  slug: "above-the-clouds",
  mainImage: { asset, hotspot: { x: 0.5, y: 0.5 } },
  ...over,
});

describe("adaptReleaseList", () => {
  it("adapts well-formed documents and applies verified editorial data", () => {
    const [release] = adaptReleaseList([doc()]);
    expect(release).toBeDefined();
    expect(release!.title).toBe("Above The Clouds");
    expect(release!.href).toBe("/post/above-the-clouds");
    expect(release!.releaseDate).toBe("2024-12-16");
    expect(release!.releaseYear).toBe(2024);
    expect(release!.billing).toBe("Justin Waves");
    expect(release!.artwork?.src(600)).toContain("600");
    expect(release!.artwork?.lqip).toBe(asset.lqip);
  });

  it("hides the year when no verified release date exists", () => {
    const [release] = adaptReleaseList([doc({ slug: "sunwillrise", title: "Sun Will Rise", publishedAt: null })]);
    expect(release!.releaseDate).toBeUndefined();
    expect(release!.releaseYear).toBeUndefined();
    // Still sortable using CMS creation time.
    expect(release!.sortKey).toBe(Date.parse("2024-01-05T10:00:00Z"));
  });

  it("builds a two-artist billing line", () => {
    const [release] = adaptReleaseList([doc({ slug: "let-it-go", title: "Let It Go" })]);
    expect(release!.billing).toBe("Justin Waves & Will O'Brien");
    expect(release!.credits).toEqual(["Will O'Brien — piano"]);
  });

  it("keeps CMS descriptions off known records unless editorial supplies one", () => {
    const [clouds] = adaptReleaseList([doc()]);
    expect(clouds!.description).toBe("");
    const [letItGo] = adaptReleaseList([doc({ slug: "let-it-go", title: "Let It Go" })]);
    expect(letItGo!.description).toBe("Featuring Will O'Brien on piano.");
  });

  it("drops malformed records instead of failing the whole list", () => {
    const list = adaptReleaseList([
      doc(),
      { _id: "post-2", title: "No slug" },
      { _id: "post-3", _createdAt: "2024-01-01T00:00:00Z", title: "", slug: "empty-title" },
      null,
      "garbage",
    ]);
    expect(list.map((r) => r.id)).toEqual(["post-1"]);
  });

  it("tolerates missing artwork and missing optional fields", () => {
    const [release] = adaptReleaseList([
      doc({ slug: "brand-new", title: "Brand New", mainImage: null, description: null, publishedAt: undefined }),
    ]);
    expect(release!.artwork).toBeUndefined();
    expect(release!.description).toBe("");
    expect(release!.releaseYear).toBeUndefined();
  });

  it("falls back to the asset URL when the asset id is missing", () => {
    const [release] = adaptReleaseList([doc({ mainImage: { asset: { url: asset.url } } })]);
    expect(release!.artwork?.src(400)).toBe(`${asset.url}?w=400&h=400&fit=crop&auto=format`);
  });

  it("sorts newest first by verified date, then creation time", () => {
    const list = adaptReleaseList([
      doc({ _id: "a", slug: "through-the-fire" }), // 2023-12-12
      doc({ _id: "b", slug: "above-the-clouds" }), // 2024-12-16
      doc({ _id: "c", slug: "sunwillrise", _createdAt: "2022-03-01T00:00:00Z", publishedAt: null }),
    ]);
    expect(list.map((r) => r.id)).toEqual(["b", "a", "c"]);
  });

  it("returns an empty list for non-array input", () => {
    expect(adaptReleaseList(null)).toEqual([]);
    expect(adaptReleaseList({ results: [] })).toEqual([]);
  });
});

describe("adaptReleaseDetail", () => {
  it("sanitises the legacy embed and filters the body to blocks", () => {
    const detail = adaptReleaseDetail({
      ...doc(),
      embed: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/track=1/size=large/bgcol=ffffff/linkcol=0687f5/" seamless></iframe>',
      body: [{ _type: "block", children: [] }, null, "x", { _type: "image" }],
    });
    expect(detail.embed?.provider).toBe("Bandcamp");
    expect(detail.body).toHaveLength(2);
  });

  it("returns a null embed when the markup is missing or untrusted", () => {
    expect(adaptReleaseDetail({ ...doc(), embed: null, body: null }).embed).toBeNull();
    expect(adaptReleaseDetail({ ...doc(), embed: '<iframe src="https://evil.example/x"></iframe>' }).embed).toBeNull();
  });
});

describe("pickFeaturedRelease", () => {
  it("prefers the first release with artwork", () => {
    const list = adaptReleaseList([doc({ _id: "no-art", slug: "above-the-clouds", mainImage: null }), doc({ _id: "art", slug: "let-it-go" })]);
    // Sorted newest first: above-the-clouds (2024-12) then let-it-go (2024-09).
    expect(pickFeaturedRelease(list)?.id).toBe("art");
  });

  it("returns undefined for an empty catalog", () => {
    expect(pickFeaturedRelease([])).toBeUndefined();
  });
});

describe("resolveBodyKind", () => {
  const lyricLine = (text: string) => ({ _type: "block", children: [{ _type: "span", text }] });

  it("labels Let It Go as lyrics", () => {
    const detail = adaptReleaseDetail({
      ...doc({ slug: "let-it-go", title: "Let It Go" }),
      embed: null,
      body: Array.from({ length: 6 }, (_, i) => lyricLine(`line ${i}`)),
    } as never);
    expect(resolveBodyKind(detail)).toBe("lyrics");
  });
});

describe("content guarantees", () => {
  it("preserves every legacy release URL", () => {
    expect(legacySlugs).toEqual(
      expect.arrayContaining(["above-the-clouds", "sunwillrise", "let-it-go", "through-the-fire", "still-i-wont-break-feat-kaeli-renae"]),
    );
  });

  it("never projects comment email addresses or moderation fields", () => {
    expect(approvedCommentsQuery).not.toMatch(/\bemail\b/);
    expect(approvedCommentsQuery).toContain("approved == true");
    expect(approvedCommentsQuery).not.toMatch(/\{[^}]*\bapproved\b[^}]*\}/);
  });

  it("projects only the release fields the UI needs", () => {
    expect(releasesQuery).toContain(releaseCardFields);
    expect(releasesQuery).not.toContain("author");
  });
});
