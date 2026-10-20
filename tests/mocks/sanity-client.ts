import { vi } from "vitest";
import type { SanityClient } from "@sanity/client";

/**
 * Minimal in-memory stand-in for the Sanity write client. Records every
 * mutation so tests can assert on what *would* have been written without any
 * network access.
 */
export function createMockClient(options: { fetch?: (query: string, params?: Record<string, unknown>) => unknown } = {}) {
  const created: Record<string, unknown>[] = [];
  const patches: { id: string; set?: Record<string, unknown>; unset?: string[] }[] = [];

  const fetch = vi.fn(async (query: string, params?: Record<string, unknown>) => {
    if (options.fetch) return options.fetch(query, params);
    // Default: no recent submissions, no existing subscriber.
    if (query.includes("count(")) return 0;
    return [];
  });

  const create = vi.fn(async (doc: Record<string, unknown>) => {
    created.push(doc);
    return { _id: `mock-${created.length}`, ...doc };
  });

  const patch = vi.fn((id: string) => {
    const entry: { id: string; set?: Record<string, unknown>; unset?: string[] } = { id };
    const builder = {
      set(values: Record<string, unknown>) {
        entry.set = values;
        return builder;
      },
      unset(fields: string[]) {
        entry.unset = fields;
        return builder;
      },
      async commit() {
        patches.push(entry);
        return { _id: id };
      },
    };
    return builder;
  });

  const client = { fetch, create, patch } as unknown as SanityClient;
  return { client, fetch, create, patch, created, patches };
}

export function jsonRequest(body: unknown, init: { ip?: string; contentType?: string } = {}) {
  return new Request("http://localhost/api/test", {
    method: "POST",
    headers: {
      "content-type": init.contentType ?? "application/json",
      "x-forwarded-for": init.ip ?? `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

/** A form submission that looks human: rendered a while ago, honeypot empty. */
export const humanTiming = () => ({ startedAt: Date.now() - 10_000, website: "" });
