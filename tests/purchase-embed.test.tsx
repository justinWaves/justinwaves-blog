import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import postSchema from "../jwavesblog/schemas/post";
import { ReleaseMedia } from "@/components/sections/ReleaseMedia";
import { adaptReleaseDetail, getReleaseBySlug } from "@/lib/sanity/releases";
import { sanitizeEmbed } from "@/lib/sanity/embed";
import { releaseBySlugQuery, releasesQuery } from "@/lib/sanity/queries";
import { readClient } from "@/lib/sanity/client";

const purchase = '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=123/size=large/bgcol=ffffff/linkcol=0687f5/" seamless></iframe>';
const spotify = '<iframe src="https://open.spotify.com/embed/track/123" width="100%" height="352"></iframe>';
const doc = (over: Record<string, unknown> = {}) => ({
  _id: "purchase-release", _createdAt: "2026-01-01T00:00:00Z", title: "Test Release", slug: "test-release", ...over,
});
const render = (over: Record<string, unknown> = {}) => renderToStaticMarkup(createElement(ReleaseMedia, {
  release: adaptReleaseDetail(doc(over)),
}));

describe("purchase embed", () => {
  it("adds an optional multiline purchase field before the unchanged audio field", () => {
    const fields = postSchema.fields;
    const field = fields.find((f) => f.name === "purchaseEmbed");
    expect(field?.type).toBe("text");
    expect(fields.findIndex((f) => f.name === "purchaseEmbed")).toBeLessThan(fields.findIndex((f) => f.name === "embed"));
    expect(fields.find((f) => f.name === "embed")?.type).toBe("string");
    expect(releaseBySlugQuery).toContain("purchaseEmbed");
    expect(releasesQuery).not.toContain("purchaseEmbed");
  });

  it("sanitizes purchase HTML with a purchase-specific accessible title", () => {
    const clean = sanitizeEmbed(purchase.replace("<iframe ", '<iframe onload="alert(1)" srcdoc="bad" '), "Test Release", "purchase");
    expect(clean?.html).toContain('title="Test Release — Bandcamp purchase"');
    expect(clean?.html).toContain('width="100%"');
    expect(clean?.html).not.toContain("onload");
    expect(clean?.html).not.toContain("srcdoc");
    expect(sanitizeEmbed('<iframe src="https://unknown.example/buy"></iframe>', "Test", "purchase")).toBeNull();
    expect(sanitizeEmbed('<iframe src="javascript:alert(1)"></iframe>', "Test", "purchase")).toBeNull();
  });

  it("renders purchase before the separate Spotify player and labels each", () => {
    const html = render({ purchaseEmbed: purchase, embed: spotify });
    expect(html).toContain('aria-label="Purchase"');
    expect(html).toContain('title="Test Release — Bandcamp purchase"');
    expect(html).toContain("Open purchase page");
    expect(html).toContain('aria-label="Listen"');
    expect(html.indexOf('aria-label="Purchase"')).toBeLessThan(html.indexOf('aria-label="Listen"'));
    expect(html).toContain("load Spotify player");
    expect(html).toContain("https://open.spotify.com/embed/track/123");
  });

  it("accepts the supplied Beatport iframe and places it above Spotify", () => {
    const beatport = '<iframe src="https://embed.beatport.com/?id=30860053&type=track" width="100%" height="162" frameborder="0" scrolling="no" style="max-width:600px;"></iframe>';
    const clean = sanitizeEmbed(beatport, "Test Release", "purchase");
    expect(clean?.provider).toBe("Beatport");
    expect(clean?.height).toBe(162);
    expect(clean?.html).toContain('title="Test Release — Beatport purchase"');
    expect(clean?.html).toContain('height="162"');
    expect(clean?.html).toContain('width="100%"');
    expect(clean?.html).toContain("max-width:600px");
    expect(clean?.html).toContain('scrolling="no"');
    expect(clean?.html).not.toContain("frameborder");
    const html = render({ purchaseEmbed: beatport, embed: spotify });
    expect(html.indexOf("Test Release — Beatport purchase")).toBeLessThan(html.indexOf('aria-label="Listen"'));
    expect(html).toContain('href="https://embed.beatport.com/?id=30860053&amp;type=track"');
    expect(html).toContain("load Spotify player");
  });

  it("normalizes HTML-encoded Beatport queries for the fallback URL", () => {
    const clean = sanitizeEmbed('<iframe src="https://embed.beatport.com/?id=30860053&amp;type=track"></iframe>', "Test", "purchase");
    expect(clean?.src).toBe("https://embed.beatport.com/?id=30860053&type=track");
  });

  it("rejects spoofed and insecure Beatport sources and strips unsafe styling", () => {
    for (const src of ["https://embed.beatport.com.evil.example/?id=1", "https://embed.beatport.com@evil.example/?id=1", "http://embed.beatport.com/?id=1"]) {
      expect(sanitizeEmbed(`<iframe src="${src}"></iframe>`, "Test", "purchase")).toBeNull();
    }
    const clean = sanitizeEmbed('<iframe onload="alert(1)" style="max-width:600px;position:fixed;top:0;" src="https://embed.beatport.com/?id=1&type=track"></iframe>', "Test", "purchase");
    expect(clean?.html).not.toContain("onload");
    expect(clean?.html).not.toContain("position");
    expect(clean?.html).not.toContain("top:");
    expect(clean?.html).toContain("max-width:600px");
  });

  it("keeps older posts unchanged, and hides missing or invalid purchase markup", () => {
    for (const value of [undefined, null, "", '<iframe src="https://unknown.example/buy"></iframe>']) {
      const html = render({ purchaseEmbed: value, embed: spotify });
      expect(html).not.toContain('aria-label="Purchase"');
      expect(html).toContain("load Spotify player");
    }
    expect(render()).toBe("");
  });

  it("supports a purchase-only release without inventing a streaming section", () => {
    const html = render({ purchaseEmbed: purchase });
    expect(html).toContain('aria-label="Purchase"');
    expect(html).not.toContain('aria-label="Listen"');
  });

  it("uses the editorial Bandcamp storefront for the purchase fallback", () => {
    const release = adaptReleaseDetail(doc({ slug: "above-the-clouds", purchaseEmbed: purchase, embed: spotify }));
    const html = renderToStaticMarkup(createElement(ReleaseMedia, { release }));
    expect(html).toContain(`href="${release.bandcampUrl}"`);
    expect(html).toContain("load Spotify player");
  });

  it("ignores a malformed new field rather than dropping the whole release", async () => {
    const fetch = vi.spyOn(readClient, "fetch").mockResolvedValueOnce(doc({ purchaseEmbed: 42, embed: spotify }) as never);
    try {
      const release = await getReleaseBySlug("test-release");
      expect(release?.purchaseEmbed).toBeNull();
      expect(release?.embed?.provider).toBe("Spotify");
    } finally { fetch.mockRestore(); }
  });
});
