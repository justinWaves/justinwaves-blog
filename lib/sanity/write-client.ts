import "server-only";
import { createClient, type SanityClient } from "@sanity/client";
import { sanityConfig } from "./config";

let cached: SanityClient | null = null;

/**
 * Write client for server-side API routes only. Never import from a client
 * component. Returns null when no token is configured so callers can respond
 * with a clean 503 instead of leaking configuration details.
 */
export function getWriteClient(): SanityClient | null {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) return null;
  if (!cached) {
    cached = createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: false,
      token,
    });
  }
  return cached;
}
