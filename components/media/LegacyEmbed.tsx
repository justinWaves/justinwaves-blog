"use client";

import { useState } from "react";
import { ExternalIcon, PlayIcon } from "@/components/brand/Icons";
import type { SanitizedEmbed } from "@/lib/sanity/embed";

/**
 * Sanitised provider player, loaded on interaction so the initial page does
 * not pay for third-party scripts. Always offers a direct link as fallback.
 */
export function LegacyEmbed({ embed, fallbackHref, fallbackLabel, listenLabel }: { embed: SanitizedEmbed; fallbackHref: string; fallbackLabel: string; listenLabel: string }) {
  const [loaded, setLoaded] = useState(false);
  const height = Math.min(Math.max(embed.height ?? 120, 120), 480);

  return (
    <div className="legacy-embed">
      {loaded ? (
        <div style={{ minHeight: height }} dangerouslySetInnerHTML={{ __html: embed.html }} />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group flex min-h-20 w-full items-center justify-between gap-4 rounded-none border rule bg-midnight/50 px-6 py-5 text-left transition-colors hover:border-ivory/50"
          aria-label={`${listenLabel} — load ${embed.provider} player`}
        >
          <span className="flex items-center gap-4">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-copper text-ink transition-colors group-hover:bg-copper-bright">
              <PlayIcon className="size-4 translate-x-px" />
            </span>
            <span>
              <span className="block font-medium text-ivory">{listenLabel}</span>
              <span className="block text-sm text-muted">{embed.provider} player</span>
            </span>
          </span>
        </button>
      )}
      <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-8 items-center gap-2 text-sm text-mist hover:text-ivory">
        {fallbackLabel}
        <ExternalIcon className="size-3.5" />
      </a>
    </div>
  );
}
