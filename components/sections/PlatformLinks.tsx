import { ExternalIcon, PlatformIcon } from "@/components/brand/Icons";
import { listenPlatforms } from "@/lib/content/site";

export function PlatformLinks() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3" role="list">
      {listenPlatforms.map((p) => (
        <li key={p.key}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 text-ivory/90 hover:text-ivory"
          >
            <PlatformIcon platform={p.key} className="size-4 text-mist transition-colors group-hover:text-ivory" />
            <span className="text-sm">{p.label}</span>
            <ExternalIcon className="size-3.5 text-muted/70" />
          </a>
        </li>
      ))}
    </ul>
  );
}
