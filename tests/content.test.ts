import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { home, mailingList, music, pageMeta, utility } from "@/lib/content/copy";
import { adidFeature, featureCta, isFeatureReady, type FeaturedRelease } from "@/lib/content/featured";
import { merchEnabled } from "@/lib/content/merch";
import { watchEnabled } from "@/lib/content/media";
import { retiredPathRedirects } from "@/lib/content/redirects";
import { formatShowDate, visibleShows, type Show } from "@/lib/content/shows";
import { pressResources } from "@/lib/content/press";
import { primaryNav, shell } from "@/lib/content/site";

describe("featureCta", () => {
  const base: FeaturedRelease = { ...adidFeature, published: true, fallbackLabel: "Listen", fallbackHref: "/music" };

  it("falls back to the catalog while a campaign is incomplete", () => {
    expect(featureCta({ ...base, state: "announcement" })).toEqual({ label: "Listen", href: "/music", external: false });
  });

  it("only offers Pre-save when a verified pre-save link exists", () => {
    expect(featureCta({ ...base, state: "preorder" }).label).toBe("Listen");
    expect(featureCta({ ...base, state: "preorder", links: { preorder: "https://store.example/x" } })).toEqual({
      label: "Pre-save",
      href: "https://store.example/x",
      external: true,
    });
  });

  it("uses Stream / save once a listening destination exists", () => {
    expect(featureCta({ ...base, state: "released", links: { listen: "https://listen.example" } }).label).toBe("Stream / save");
    expect(featureCta({ ...base, state: "released", links: { bandcamp: "https://bc.example" } }).label).toBe("Stream / save");
    expect(featureCta({ ...base, state: "released" }).label).toBe("Listen");
  });

  it("keeps the ADID collaboration unpublished until campaign assets exist", () => {
    expect(adidFeature.published).toBe(false);
    expect(adidFeature.trackTitle).toBeUndefined();
    expect(adidFeature.artwork).toBeUndefined();
    expect(adidFeature.links).toBeUndefined();
    expect(isFeatureReady(adidFeature)).toBe(false);
  });

  it("treats a complete released campaign as ready", () => {
    expect(
      isFeatureReady({
        ...base,
        published: true,
        state: "released",
        trackTitle: "Verified Title",
        artwork: { src: "/x.jpg", width: 1, height: 1, alt: "cover" },
        links: { listen: "https://listen.example" },
      }),
    ).toBe(true);
  });
});

describe("visibleShows", () => {
  const now = new Date("2026-10-07T12:00:00Z");
  const show = (id: string, start: string): Show => ({ id, start, timeZone: "America/Los_Angeles", venue: "Venue", city: "City" });

  it("lists upcoming shows soonest first, then a short badged tail of recent past shows", () => {
    const list = [
      show("far", "2027-01-10T21:00:00-08:00"),
      show("soon", "2026-10-20T21:00:00-07:00"),
      show("last-month", "2026-09-12T21:00:00-07:00"),
      show("ancient", "2025-01-01T21:00:00-08:00"),
    ];
    const visible = visibleShows(list, now);
    expect(visible.map((s) => [s.id, s.past])).toEqual([
      ["soon", false],
      ["far", false],
      ["last-month", true],
    ]);
  });

  it("caps the past tail at four entries", () => {
    const past = Array.from({ length: 6 }, (_, i) => show(`p${i}`, `2026-0${9 - Math.min(i, 2)}-0${i + 1}T20:00:00-07:00`));
    expect(visibleShows(past, now).filter((s) => s.past)).toHaveLength(4);
  });

  it("formats dates in the venue's timezone", () => {
    expect(formatShowDate(show("x", "2026-10-20T21:00:00-07:00"))).toBe("Tue, Oct 20, 2026");
  });
});

describe("fan information architecture", () => {
  it("exposes Music, Live, Subscribe, and Contact, omitting empty Merch and Watch", () => {
    expect(merchEnabled()).toBe(false);
    expect(watchEnabled()).toBe(false);
    expect(primaryNav().map((item) => item.label)).toEqual(["Music", "Live", "Subscribe", "Contact"]);
    expect(primaryNav().map((item) => item.href)).toEqual(["/music", "/live", "/#subscribe", "/#contact"]);
  });

  it("redirects retired professional routes", () => {
    expect(retiredPathRedirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "/epk", destination: "/#contact" }),
        expect.objectContaining({ source: "/work", destination: "/" }),
        expect.objectContaining({ source: "/about", destination: "/" }),
      ]),
    );
  });

  it("uses the approved metadata and utility copy", () => {
    expect(pageMeta.home.title).toBe("Justin Waves | Official Website");
    expect(pageMeta.home.description).toBe("Music, videos, live dates, and updates from Justin Waves.");
    expect(pageMeta.music.title).toBe("Music | Justin Waves");
    expect(pageMeta.live.title).toBe("Live | Justin Waves");
    expect(home.hero.listen.label).toBe("Listen");
    expect(music.h1).toBe("Music");
    expect(mailingList.body).toBe("New music, live dates, and updates by email.");
    expect(utility.notFound.title).toBe("Page not found");
    expect(utility.error.title).toBe("Something went wrong");
  });

  it("keeps the phone number off the site unless explicitly enabled", () => {
    expect(pressResources.phone).toBeUndefined();
  });

  it("omits the builder credit link until a URL is approved", () => {
    expect(shell.builderCreditHref).toBeNull();
  });
});

describe("rejected professional copy", () => {
  const publicText = [
    readFileSync(new URL("../lib/content/copy.ts", import.meta.url), "utf8"),
    readFileSync(new URL("../lib/content/site.ts", import.meta.url), "utf8"),
    readFileSync(new URL("../lib/seo.ts", import.meta.url), "utf8"),
    readFileSync(new URL("../lib/content/featured.ts", import.meta.url), "utf8"),
  ].join("\n");

  it("does not publish rejected slogans or career-credit language", () => {
    expect(publicText).not.toMatch(/human pulse/i);
    expect(publicText).not.toMatch(/shared stages with/i);
    expect(publicText).not.toMatch(/Bring Justin Waves to your stage/i);
    expect(publicText).not.toMatch(/Let's make a night of it/i);
    expect(publicText).not.toMatch(/Stay close to the music/i);
    expect(publicText).not.toMatch(/Music, made together/i);
    expect(publicText).not.toMatch(/A voice at the center/i);
    expect(publicText).not.toMatch(/The songs, in the room/i);
    expect(publicText).not.toMatch(/Songs that open up on the dance floor/i);
    expect(publicText).not.toMatch(/Bringing his voice into the label/i);
    expect(publicText).not.toMatch(/\bEPK\b/);
    expect(publicText).not.toMatch(/Production & Composition/);
  });
});
