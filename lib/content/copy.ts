/**
 * Public website copy. Section labels, form text, and metadata live here.
 * Identity is carried by the music, imagery, and products — not slogans.
 */

export const home = {
  hero: {
    h1: "Justin Waves",
    listen: { label: "Listen", href: "/music" },
    pauseVideo: "Pause background video",
    playVideo: "Play background video",
  },
  music: {
    heading: "Music",
    all: { label: "All music", href: "/music" },
  },
  merch: {
    heading: "Merch",
    shop: "Shop",
    buy: "Buy",
  },
  live: {
    heading: "Live",
    tickets: "Tickets",
    all: { label: "All dates", href: "/live" },
  },
  watch: {
    heading: "Watch",
    play: "Play",
  },
  contact: {
    heading: "Contact",
    label: "Bookings & enquiries",
  },
} as const;

export const mailingList = {
  heading: "Subscribe",
  body: "New music, live dates, and updates by email.",
  emailLabel: "Email address",
  button: "Subscribe",
  pending: "Subscribing…",
  success: "You're subscribed.",
  error: "We couldn't add you right now. Please try again.",
  invalidEmail: "Enter a valid email address.",
  consent: "You'll receive new music, live dates, and updates from Justin Waves. You can unsubscribe at any time.",
} as const;

export const unsubscribe = {
  title: "Unsubscribe",
  heading: "Unsubscribe",
  body: "Enter the email address you joined with and we'll remove it from Justin Waves updates.",
  button: "Unsubscribe",
  pending: "Working…",
  success: "If that address was on the list, it has been removed.",
  error: "We couldn't process that right now. Please try again, or email us and we'll take care of it.",
  tokenSuccess: "You've been unsubscribed from Justin Waves updates.",
  tokenInvalid: "That unsubscribe link isn't valid. You can unsubscribe with your email address below.",
  help: "Need help? Email",
} as const;

export const music = {
  h1: "Music",
  empty: "Explore Justin Waves on your preferred listening platform.",
} as const;

export const releaseDetail = {
  purchase: "Purchase",
  purchaseFallback: "Open purchase page",
  labels: {
    artists: "Artists",
    label: "Label",
    releaseDate: "Release date",
    credits: "Credits",
  },
  listen: "Listen",
  bandcamp: "Bandcamp",
  back: "All music",
  lyricsHeading: "Lyrics",
  notesHeading: "About the release",
  relatedHeading: "More music",
  embedFallback: (platform: string) => `Open on ${platform}`,
  notFound: {
    title: "Release not found",
    body: "This release may have moved or is no longer available here.",
    action: { label: "Music", href: "/music" },
  },
} as const;

export const comments = {
  heading: "Leave a note",
  listHeading: "Notes",
  name: "Name",
  email: "Email address",
  message: "Message",
  button: "Send note",
  pending: "Sending…",
  success: "Thanks. Your note will appear after approval.",
  error: "We couldn't send your note. Please try again.",
  emailHelper: "Your email address won't be displayed.",
} as const;

export const live = {
  h1: "Live",
  datesEmpty: "No upcoming dates announced.",
  subscribe: { label: "Subscribe for updates", href: "/#subscribe" },
  tickets: "Tickets",
  pastBadge: "Past",
} as const;

export const utility = {
  notFound: {
    title: "Page not found",
    body: "The page you're looking for could not be found.",
    action: { label: "Home", href: "/" },
  },
  error: {
    title: "Something went wrong",
    body: "Please try again.",
    retry: "Try again",
  },
} as const;

export const pageMeta = {
  home: {
    title: "Justin Waves | Official Website",
    description: "Music, videos, live dates, and updates from Justin Waves.",
  },
  music: {
    title: "Music | Justin Waves",
    description: "Releases from Justin Waves.",
  },
  live: {
    title: "Live | Justin Waves",
    description: "Live dates from Justin Waves.",
  },
  unsubscribe: {
    title: "Unsubscribe | Justin Waves",
    description: "Remove your email address from Justin Waves updates.",
  },
} as const;
