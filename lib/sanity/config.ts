export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "yy49y5un",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
} as const;

/** Revalidation windows (seconds). Music/show updates appear within these. */
export const revalidate = {
  releases: 300,
  release: 300,
  comments: 60,
  settings: 600,
} as const;
