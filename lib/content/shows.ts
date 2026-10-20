/**
 * Live dates.
 *
 * Only confirmed events belong here. Each entry carries the venue's IANA
 * timezone so the past/upcoming split and the displayed date are evaluated in
 * local venue time. Past shows remain listed (badged) for a limited window.
 *
 * As of 2026-10-07 no upcoming dates are confirmed; speculative opportunities
 * (The Midway SF, openings involving The Knocks / Emmit Fenn) are excluded
 * until billing, spelling, and dates are confirmed by the owner.
 */

export type Show = {
  id: string;
  /** ISO 8601 date-time with offset, e.g. "2026-03-14T21:00:00-07:00" */
  start: string;
  timeZone: string;
  venue: string;
  city: string;
  /** Lineup / billing line, e.g. "with …" — only when confirmed. */
  billing?: string;
  ticketUrl?: string;
};

export const shows: readonly Show[] = [];

export function isPast(show: Show, now: Date = new Date()) {
  return new Date(show.start).getTime() < now.getTime();
}

export function formatShowDate(show: Show) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: show.timeZone,
  }).format(new Date(show.start));
}

export function formatShowTime(show: Show) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: show.timeZone,
    timeZoneName: "short",
  }).format(new Date(show.start));
}

export function splitShows(list: readonly Show[], now: Date = new Date()) {
  const upcoming = list.filter((s) => !isPast(s, now)).sort((a, b) => a.start.localeCompare(b.start));
  const past = list.filter((s) => isPast(s, now)).sort((a, b) => b.start.localeCompare(a.start));
  return { upcoming, past };
}

export type VisibleShow = Show & { past: boolean };

const PAST_WINDOW_MS = 1000 * 60 * 60 * 24 * 182; // ~6 months
const PAST_LIMIT = 4;

/**
 * Shows to render on the Live page: all upcoming, followed by a short tail of
 * recent past shows (badged) for context. Evaluated once per request.
 */
export function visibleShows(list: readonly Show[], now: Date = new Date()): VisibleShow[] {
  const { upcoming, past } = splitShows(list, now);
  const recentPast = past.filter((s) => new Date(s.start).getTime() > now.getTime() - PAST_WINDOW_MS).slice(0, PAST_LIMIT);
  return [...upcoming.map((s) => ({ ...s, past: false })), ...recentPast.map((s) => ({ ...s, past: true }))];
}
