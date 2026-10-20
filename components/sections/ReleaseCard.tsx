import Image from "next/image";
import Link from "next/link";
import type { Release } from "@/lib/sanity/releases";

export function ReleaseArtworkImage({ release, size = 640, sizes, priority = false, className = "" }: { release: Release; size?: number; sizes: string; priority?: boolean; className?: string }) {
  if (!release.artwork) {
    return (
      <div className={`flex aspect-square items-center justify-center bg-midnight text-mist ${className}`} aria-hidden="true">
        <span className="font-display text-3xl italic">{release.title.slice(0, 1)}</span>
      </div>
    );
  }
  return (
    <Image
      src={release.artwork.src(size)}
      alt={release.artwork.alt}
      width={size}
      height={size}
      sizes={sizes}
      priority={priority}
      placeholder={release.artwork.lqip ? "blur" : "empty"}
      blurDataURL={release.artwork.lqip}
      className={`aspect-square h-auto w-full object-cover ${className}`}
    />
  );
}

export function ReleaseCard({
  release,
  priority = false,
  sizes = "(min-width: 768px) 30vw, 46vw",
}: {
  release: Release;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group release-card">
      <Link href={release.href} className="block rounded-none focus-visible:outline-offset-4">
        <div className="image-frame rounded-none">
          <ReleaseArtworkImage
            release={release}
            sizes={sizes}
            priority={priority}
            className="transition-transform duration-200 ease-[var(--ease-cinematic)] group-hover:scale-[1.015]"
          />
        </div>
        <h3 className="release-title mt-3 text-base leading-snug text-ivory transition-colors group-hover:text-copper-bright sm:text-xl">{release.title}</h3>
        <p className="release-meta mt-2 text-muted">{release.billing}</p>
        {release.releaseYear ? <p className="release-meta mt-1 text-mist">{release.releaseYear}</p> : null}
      </Link>
    </article>
  );
}

export function ReleaseGrid({ releases, priorityCount = 0, columns = 4 }: { releases: readonly Release[]; priorityCount?: number; columns?: 3 | 4 }) {
  // 4-up keeps a 2×2 arrangement on tablets so a four-item set never orphans a card.
  const cols = columns === 3 ? "md:grid-cols-3" : "lg:grid-cols-4";
  const sizes = columns === 3 ? "(min-width: 768px) 30vw, 46vw" : "(min-width: 1024px) 22vw, 46vw";
  return (
    <ul className={`archive-grid grid grid-cols-2 ${cols}`} role="list">
      {releases.map((release, i) => (
        <li key={release.id}>
          <ReleaseCard release={release} priority={i < priorityCount} sizes={sizes} />
        </li>
      ))}
    </ul>
  );
}
