import { createClient } from "@sanity/client";
import { sanityConfig } from "./config";

/**
 * Read-only client. Safe to import anywhere; it carries no token.
 * Reads from the Sanity CDN in production for speed; the App Router cache
 * controls freshness through `revalidate` on each fetch.
 */
export const readClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});
