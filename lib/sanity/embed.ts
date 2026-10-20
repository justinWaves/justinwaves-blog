import sanitizeHtml from "sanitize-html";

/**
 * Legacy CMS "embed" strings are raw provider HTML (Bandcamp / SoundCloud
 * iframes). They are allow-listed to expected providers and iframe attributes
 * before rendering. Anything else is dropped and the UI shows a link instead.
 */

export type EmbedProvider = "Bandcamp" | "Beatport" | "SoundCloud" | "Spotify" | "YouTube" | "Apple Music";

const providerHosts: Record<EmbedProvider, RegExp> = {
  Beatport: /^https:\/\/embed\.beatport\.com\/(?:\?|$)/i,
  Bandcamp: /^https:\/\/bandcamp\.com\/EmbeddedPlayer\//i,
  SoundCloud: /^https:\/\/w\.soundcloud\.com\/player\//i,
  Spotify: /^https:\/\/open\.spotify\.com\/embed\//i,
  YouTube: /^https:\/\/www\.youtube(-nocookie)?\.com\/embed\//i,
  "Apple Music": /^https:\/\/embed\.music\.apple\.com\//i,
};

export type SanitizedEmbed = {
  html: string;
  provider: EmbedProvider;
  src: string;
  /** Height in px parsed from the embed, when provided. */
  height?: number;
};

function detectProvider(src: string): EmbedProvider | null {
  for (const [name, re] of Object.entries(providerHosts) as [EmbedProvider, RegExp][]) {
    if (re.test(src)) return name;
  }
  return null;
}

export function sanitizeEmbed(raw: string | null | undefined, title: string, kind: "player" | "purchase" = "player"): SanitizedEmbed | null {
  if (!raw || typeof raw !== "string") return null;

  const srcMatch = raw.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  const src = srcMatch?.[1]?.replace(/&amp;/gi, "&");
  if (!src) return null;
  const provider = detectProvider(src);
  if (!provider) return null;

  const heightMatch = raw.match(/height:\s*(\d+)px/i) ?? raw.match(/\sheight=["']?(\d+)/i);
  const height = heightMatch?.[1] ? Number(heightMatch[1]) : undefined;

  const html = sanitizeHtml(raw, {
    allowedTags: ["iframe"],
    allowedAttributes: {
      iframe: ["src", "width", "height", "allow", "loading", "title", "style", "scrolling", "seamless"],
    },
    allowedIframeHostnames: ["embed.beatport.com", "bandcamp.com", "w.soundcloud.com", "open.spotify.com", "www.youtube.com", "www.youtube-nocookie.com", "embed.music.apple.com"],
    allowedSchemes: ["https"],
    allowedStyles: {
      iframe: {
        border: [/^0$/, /^none$/],
        width: [/^\d+(px|%)$/],
        "max-width": [/^\d+(px|%)$/],
        height: [/^\d+(px|%)$/],
      },
    },
    transformTags: {
      iframe: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          title: `${title} — ${provider} ${kind}`,
          loading: "lazy",
          width: "100%",
          ...(provider === "Bandcamp" && attribs.src ? { src: bandcampDarkTheme(attribs.src) } : {}),
        },
      }),
    },
  }).trim();

  if (!html.startsWith("<iframe")) return null;
  return { html, provider, src, height };
}

/** Align the Bandcamp player chrome with the site palette. */
function bandcampDarkTheme(src: string) {
  // Bandcamp only honours lowercase hex in these path segments.
  return src.replace(/bgcol=[0-9a-fA-F]{6}/, "bgcol=141c2f").replace(/linkcol=[0-9a-fA-F]{6}/, "linkcol=cc8470");
}
