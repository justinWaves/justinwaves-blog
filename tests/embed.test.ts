import { describe, expect, it } from "vitest";
import { sanitizeEmbed } from "@/lib/sanity/embed";

const bandcamp =
  '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/track=2431841881/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="https://justinwaves.bandcamp.com/track/let-it-go">Let It Go</a></iframe>';

const soundcloud =
  '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1&color=%23ff5500"></iframe>';

describe("sanitizeEmbed", () => {
  it("accepts a Bandcamp player, re-themes it, and extracts height", () => {
    const result = sanitizeEmbed(bandcamp, "Let It Go");
    expect(result).not.toBeNull();
    expect(result!.provider).toBe("Bandcamp");
    expect(result!.height).toBe(120);
    expect(result!.html).toContain("bgcol=141c2f");
    expect(result!.html).toContain("linkcol=cc8470");
    expect(result!.html).toContain('title="Let It Go — Bandcamp player"');
    expect(result!.html).toContain('loading="lazy"');
    // The fallback anchor inside the iframe is stripped.
    expect(result!.html).not.toContain("<a ");
  });

  it("accepts a SoundCloud player and keeps its height attribute", () => {
    const result = sanitizeEmbed(soundcloud, "Sun Will Rise");
    expect(result?.provider).toBe("SoundCloud");
    expect(result?.height).toBe(166);
    expect(result?.html).not.toContain("frameborder");
  });

  it("rejects unknown hosts, scripts, and non-https sources", () => {
    expect(sanitizeEmbed('<iframe src="https://evil.example/player"></iframe>', "x")).toBeNull();
    expect(sanitizeEmbed('<script>alert(1)</script><iframe src="https://bandcamp.com/EmbeddedPlayer/x"></iframe>', "x")?.html).not.toContain("<script");
    expect(sanitizeEmbed('<iframe src="http://bandcamp.com/EmbeddedPlayer/track=1"></iframe>', "x")).toBeNull();
  });

  it("strips event handlers and unknown attributes", () => {
    const result = sanitizeEmbed('<iframe onload="alert(1)" data-x="1" allowfullscreen src="https://w.soundcloud.com/player/?url=1"></iframe>', "x");
    expect(result).not.toBeNull();
    expect(result!.html).not.toContain("onload");
    expect(result!.html).not.toContain("data-x");
    expect(result!.html).not.toContain("allowfullscreen");
    expect(result!.html).toContain('src="https://w.soundcloud.com/player/?url=1"');
  });

  it("refuses markup it cannot parse unambiguously (e.g. srcdoc payloads)", () => {
    expect(sanitizeEmbed('<iframe srcdoc="<b>x</b>" src="https://w.soundcloud.com/player/?url=1"></iframe>', "x")).toBeNull();
  });

  it("returns null for empty or non-iframe input", () => {
    expect(sanitizeEmbed(null, "x")).toBeNull();
    expect(sanitizeEmbed("", "x")).toBeNull();
    expect(sanitizeEmbed("<p>hello</p>", "x")).toBeNull();
  });
});
