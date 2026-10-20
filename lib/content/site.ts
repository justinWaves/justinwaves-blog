/**
 * Site-wide configuration and shared shell copy.
 */

import { merchEnabled } from "./merch";
import { watchEnabled } from "./media";

export const SITE_NAME = "Justin Waves";
export const ARTIST_LEGAL_NAME = "Justin Weisberg";
export const BOOKING_EMAIL = "jwmusicco@gmail.com";

export const siteUrl = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return "https://www.justinwaves.com";
})();

export type NavItem = { label: string; href: string };

/**
 * Fan navigation. Merch and Watch appear only when a real destination exists.
 * Live always points at the dedicated dates page.
 */
export function primaryNav(): readonly NavItem[] {
  const items: NavItem[] = [{ label: "Music", href: "/music" }];
  if (merchEnabled()) {
    items.push({ label: "Merch", href: "/#merch" });
  }
  items.push({ label: "Live", href: "/live" });
  if (watchEnabled()) {
    items.push({ label: "Watch", href: "/#watch" });
  }
  items.push({ label: "Subscribe", href: "/#subscribe" }, { label: "Contact", href: "/#contact" });
  return items;
}

export const shell = {
  openNav: "Open navigation",
  closeNav: "Close navigation",
  skipLink: "Skip to content",
  footerContactLabel: "Bookings & enquiries",
  footerUnsubscribe: { label: "Unsubscribe", href: "/unsubscribe" },
  copyright: (year: number) => `© ${year} Justin Waves.`,
  builderCredit: "Designed and built by Justin Weisberg.",
  builderCreditHref: null as string | null,
} as const;

export type PlatformKey =
  | "spotify"
  | "appleMusic"
  | "soundcloud"
  | "bandcamp"
  | "instagram"
  | "youtube"
  | "tiktok";

export type PlatformLink = {
  key: PlatformKey;
  label: string;
  href: string;
  kind: "listen" | "social";
};

export const platforms: readonly PlatformLink[] = [
  {
    key: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/artist/13TnKCSQSOkWzKgK09wNzQ",
    kind: "listen",
  },
  {
    key: "appleMusic",
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/justin-waves/1498973677",
    kind: "listen",
  },
  {
    key: "soundcloud",
    label: "SoundCloud",
    href: "https://soundcloud.com/justinwaves",
    kind: "listen",
  },
  {
    key: "bandcamp",
    label: "Bandcamp",
    href: "https://justinwaves.bandcamp.com",
    kind: "listen",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/justinwaves/",
    kind: "social",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCTL59752f6PIWECN-fzONQA",
    kind: "social",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@justinwaves",
    kind: "social",
  },
];

export const listenPlatforms = platforms.filter((p) => p.kind === "listen");
export const socialPlatforms = platforms.filter((p) => p.kind === "social");

export function mailto(subject?: string) {
  const base = `mailto:${BOOKING_EMAIL}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
