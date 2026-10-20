"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/brand/Icons";

export function WatchPlayer({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <figure>
      <div className="image-frame relative aspect-video w-full rounded-none">
        {loaded ? (
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
            <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink transition-transform group-hover:scale-105">
              <PlayIcon className="size-6 translate-x-0.5" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 font-sans text-base text-ivory">{title}</figcaption>
    </figure>
  );
}
