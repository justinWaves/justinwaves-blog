/**
 * Retired professional routes. Visitors holding old links land on the fan site.
 * Consumed by next.config.ts so the mapping can be unit-tested.
 */

export const retiredPathRedirects = [
  { source: "/epk", destination: "/#contact", permanent: true },
  { source: "/epk/:path*", destination: "/#contact", permanent: true },
  { source: "/work", destination: "/", permanent: true },
  { source: "/work/:path*", destination: "/", permanent: true },
  { source: "/about", destination: "/", permanent: true },
  { source: "/about/:path*", destination: "/", permanent: true },
] as const;
