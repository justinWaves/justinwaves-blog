# Justin Waves — artist website

Official fan website for Justin Waves (music, live dates, videos, and updates), built with the Next.js App Router and backed by the existing Sanity dataset.

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.9
- **Styling:** Tailwind CSS 4 (CSS-first `@theme` tokens in `app/globals.css`, no `tailwind.config`)
- **Content:** Sanity project `yy49y5un`, dataset `production` (read-only typed adapter; Studio lives in `jwavesblog/` and is unchanged)
- **Tests:** Vitest (node environment, CMS and write APIs mocked)

## Requirements

- Node `^20.19.0 || >=22.12.0` — `.nvmrc` pins `22.23.3` (`nvm use`)
- `ffmpeg` on `PATH` only if you re-run the media pipeline

## Setup

```bash
nvm use
npm install          # clean install; no --force / --legacy-peer-deps needed
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

### Environment

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | public | Sanity project (`yy49y5un`) |
| `NEXT_PUBLIC_SANITY_DATASET` | public | Sanity dataset (`production`) |
| `SANITY_API_TOKEN` | **server only** | Write token used by `/api/*` to create comments and subscribers. Never imported by client code (`lib/sanity/write-client.ts` is `server-only`). |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin for metadata, sitemap, JSON-LD |
| `FORM_SECRET` | **server only** | ≥16 chars. Signs unsubscribe tokens and keys the IP hash used for rate limiting. Required in production (`openssl rand -hex 32`). |
Without `SANITY_API_TOKEN` the forms respond `503` and store nothing; the site still renders.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint 10 flat config (`eslint-config-next` core-web-vitals + TypeScript) |
| `npm test` | Vitest run (79 tests) |
| `npm run check` | typecheck → lint → test → build |
| `npm run media:build` | Regenerate `public/media/**` from the source assets (needs `ffmpeg`) |

## Project structure

```
app/                      routes, layout, metadata, sitemap/robots, error + not-found
  api/{subscribe,comment,unsubscribe}/route.ts   POST handlers (405 otherwise)
  post/[slug]/            release detail (legacy URLs preserved)
components/
  brand/                  wordmark, wave/moon mark, platform + UI icons (inline SVG)
  layout/                 header + mobile navigation, footer, skip link
  sections/               homepage and catalog sections
  media/                  HeroVideo, LegacyEmbed (click-to-load)
  forms/                  mailing list, comment, unsubscribe
  ui/                     Button, Section primitives, Motif
lib/
  content/                typed, centralised copy and editorial data (the only place text lives)
  sanity/                 read client, GROQ projections, zod adapters, embed sanitiser
  server/                 server-only: handlers, security (HMAC, rate limits), submissions
  validation/             zod schemas shared by handlers (and used for messages)
scripts/build-media.mjs   media pipeline
tests/                    Vitest suites + mock Sanity client
public/media/             generated delivery assets (hero loop, posters, photos, motifs, OG)
_private/press/           press-only originals (not publicly served)
jwavesblog/               Sanity Studio v2 — untouched
```

## Content model

- **Releases** come from legacy `post` documents. `lib/sanity/releases.ts` parses them leniently with zod (malformed records are dropped, never fatal) and overlays verified editorial data from `lib/content/releases.ts` (artists, verified release dates, Bandcamp URLs, credits). Unknown metadata is hidden rather than guessed — e.g. *Sun Will Rise* has no verified date so no year is shown.
- **Comments** are projected to public fields only (`_id, _createdAt, name, comment`). Email addresses and moderation fields never reach HTML, RSC payloads or JSON.
- **Featured release** (`lib/content/featured.ts`): unpublished until title, artwork, and a listening or pre-save link are all present. Incomplete campaigns are not shown.
- **Merch** (`lib/content/merch.ts`) and **Watch** (`lib/content/media.ts` `videos`): omitted from navigation until a store URL/product list or an authorized YouTube ID is supplied.
- Retired routes: `/about` and `/work` redirect to `/`; `/epk` redirects to `/#contact`.
- **Live dates** (`lib/content/shows.ts`): empty until confirmed. Entries carry an IANA timezone; past dates are badged and age out after ~6 months.
- **Copy** lives in `lib/content/copy.ts` and `lib/content/site.ts`. Pages import from there; nothing is hard-coded in components.

### Purchase and listening embeds

In the Sanity Studio's Post editor, **Purchase embed** (`purchaseEmbed`) accepts the complete HTTPS iframe markup from Beatport, Bandcamp, or another provider already supported by `lib/sanity/embed.ts`. It is optional and appears before **Audio player embed** (the existing `embed` field). Paste iframe HTML, not just a storefront URL. Unknown providers are not rendered; add a reviewed provider to the sanitizer when needed.

The release page displays Purchase first, with a direct purchase-page fallback link, then the existing click-to-load listening player. Posts without a purchase iframe keep their current listening behavior. Both embeds are sanitized independently. The schema source is `jwavesblog/schemas/post.js`; the separate legacy Sanity Studio must be rebuilt/redeployed before its hosted editor shows the new field. No existing post migration is needed. Published changes follow the existing release revalidation interval.

### Caching

Server reads use `next: { revalidate, tags }` — releases 300 s (`releases`, `release:<slug>`), comments 60 s (`comments:<postId>`). Release pages are prerendered via `generateStaticParams` (legacy slugs ∪ CMS slugs) with ISR.

## Forms and abuse prevention

All three endpoints are `POST` JSON (`application/json`, ≤16 KB):

| Status | Meaning |
| --- | --- |
| `200`/`201` | stored (subscribe/unsubscribe; comment created, `approved: false`) |
| `202` | looked automated (honeypot filled or submitted under 2.5 s) — accepted silently, nothing stored |
| `400` | validation error (`field` names the offending input when known) |
| `405` | non-POST |
| `429` | rate limited |
| `502` | Sanity write failed |
| `503` | write client not configured |

Rate limiting has two layers: an in-memory window per instance plus a count of recent submissions by hashed IP in the dataset itself, so limits hold across multiple instances without another service. IPs are stored only as a keyed HMAC (`ipHash`).

**Subscribers** are `emails` documents with additive fields `status`, `consentVersion`, `consentAt`, `source`, `ipHash`, `unsubscribedAt`. Re-subscribing re-activates in place; the response is identical whether or not the address existed. **Unsubscribe** works by email at `/unsubscribe` (neutral response) or by HMAC token (`?token=` from a future mailing). Email delivery itself is not configured — see "Not in scope".

The Studio schema in `jwavesblog/` has not been changed to declare the new fields; they are additive and the dataset was not bulk-rewritten.

## Media pipeline

`npm run media:build` regenerates everything under `public/media` from the originals in `public/`:

- **Hero loop** from `public/jw-bg-vid.mp4` (720×576 daytime DJ set): seamless 11.3 s loop via `xfade`, warm/dark grade, 24 fps. Desktop 5:4 H.264 + VP9 (~1.9 MB / 1.8 MB), mobile 3:4 crop (~1.05 MB / 1.04 MB), JPG+WebP posters. Vignette/contrast are CSS so they can be tuned without re-encoding.
- **Photos** as AVIF + WebP srcsets; **press originals** stored in `_private/press`; **motifs** from the transparent PNG pack as WebP; **OG image**.

To swap in better footage, replace the source path at the top of the script and re-run.

`HeroVideo` renders the poster first, chooses the mobile or desktop rendition in JS, pauses when off-screen or the tab is hidden, and falls back to the poster when `prefers-reduced-motion` or `Save-Data` is set. A visible pause/play control is always available.

## Design decisions

- **Tailwind 4, CSS-first.** Tokens (`--color-ink #0B1018`, `--color-midnight #141C2F`, `--color-ivory #EEE9E0`, `--color-copper #CC8470`, `--color-mist #A9BCD0`, `--color-muted #B8BEC9`, rule `rgba(238,233,224,0.16)`) and a small set of `@utility` classes (`display-*`, `eyebrow`, `container-site`, `vignette`, `grain`) live in `app/globals.css`. No plugin config file is needed.
- **Type:** Inter (UI/body) + Cormorant Garamond (display) via `next/font`; the wordmark is an SVG.
- **No `next-sanity`.** It peer-depends on the `sanity` Studio package and styled-components; `@sanity/client` + `@sanity/image-url` + `@portabletext/react` cover the read path without that weight.
- **Inline `<img>` for pre-encoded photos** (`srcset`/`sizes` generated by the pipeline); `next/image` is used for motifs and CDN artwork. The `@next/next/no-img-element` rule is disabled for that reason.

## Not in scope / follow-ups for the owner

- Email delivery (confirmation or campaigns) — only capture, consent fields and unsubscribe exist.
- Store URL and product photography (`lib/content/merch.ts`); an authorized video URL (`lib/content/media.ts` `videos`); confirmed live dates (`lib/content/shows.ts`).
- Verified ADID release title, artwork, credits, date, and listening links.
- `FORM_SECRET` and `NEXT_PUBLIC_SITE_URL` in the production environment.
- Deployment.
