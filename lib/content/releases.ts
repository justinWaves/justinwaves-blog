/**
 * Editorial data for existing catalog records, keyed by the legacy public slug.
 *
 * The CMS remains the source of truth for title, artwork, body, and embed.
 * Unknown fields are left undefined and hidden. Generic promotional filler is
 * omitted; track credits stay.
 */

export type ReleaseEditorial = {
  description?: string;
  /** ISO date (YYYY-MM-DD) verified against the record's public page. */
  releaseDate?: string;
  artists: readonly string[];
  bandcampUrl?: string;
  primaryPlatform?: { name: string; url: string };
  credits?: readonly string[];
  label?: string;
  /** How to label the CMS body when present. */
  bodyKind?: "lyrics" | "notes";
};

export const releaseEditorial: Record<string, ReleaseEditorial> = {
  "above-the-clouds": {
    releaseDate: "2024-12-16",
    artists: ["Justin Waves"],
    bandcampUrl: "https://justinwaves.bandcamp.com/track/above-the-clouds",
    primaryPlatform: { name: "Bandcamp", url: "https://justinwaves.bandcamp.com/track/above-the-clouds" },
  },
  sunwillrise: {
    artists: ["Justin Waves"],
    primaryPlatform: { name: "SoundCloud", url: "https://soundcloud.com/justinwaves/sun-will-rise" },
  },
  "let-it-go": {
    description: "Featuring Will O'Brien on piano.",
    releaseDate: "2024-09-27",
    artists: ["Justin Waves", "Will O'Brien"],
    bandcampUrl: "https://justinwaves.bandcamp.com/track/let-it-go-feat-will-obrien",
    primaryPlatform: { name: "Bandcamp", url: "https://justinwaves.bandcamp.com/track/let-it-go-feat-will-obrien" },
    credits: ["Will O'Brien — piano"],
    bodyKind: "lyrics",
  },
  "through-the-fire": {
    releaseDate: "2023-12-12",
    artists: ["Justin Waves"],
    bandcampUrl: "https://justinwaves.bandcamp.com/track/through-the-fire",
    primaryPlatform: { name: "Bandcamp", url: "https://justinwaves.bandcamp.com/track/through-the-fire" },
  },
  "still-i-wont-break-feat-kaeli-renae": {
    releaseDate: "2023-01-26",
    artists: ["Justin Waves", "Kaeli Renae"],
    bandcampUrl: "https://justinwaves.bandcamp.com/track/still-i-wont-break-feat-kaeli-renae",
    primaryPlatform: {
      name: "Bandcamp",
      url: "https://justinwaves.bandcamp.com/track/still-i-wont-break-feat-kaeli-renae",
    },
  },
};

export const legacySlugs = Object.keys(releaseEditorial);

export type MixEntry = {
  title: string;
  kind: "dj-mix" | "hybrid-set";
  url: string;
  platform: string;
};
export const mixes: readonly MixEntry[] = [];
