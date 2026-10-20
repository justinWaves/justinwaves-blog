import { ExternalIcon } from "@/components/brand/Icons";
import { LegacyEmbed } from "@/components/media/LegacyEmbed";
import { Button } from "@/components/ui/Button";
import { releaseDetail } from "@/lib/content/copy";
import type { ReleaseDetail } from "@/lib/sanity/releases";

/** Purchase is always first; posts without it keep the existing listening flow. */
export function ReleaseMedia({ release }: { release: ReleaseDetail }) {
  const purchase = release.purchaseEmbed;
  const listenHref = release.primaryPlatform?.url ?? release.bandcampUrl;
  const hasListening = Boolean(release.embed || listenHref);
  const showBandcamp = Boolean(release.bandcampUrl)
    && release.bandcampUrl !== listenHref
    && release.embed?.provider !== "Bandcamp"
    && purchase?.provider !== "Bandcamp";

  return (
    <>
      {purchase ? (
        <section aria-label={releaseDetail.purchase} className="mt-8 border-t rule pt-6">
          <h2 className="eyebrow mb-4">{releaseDetail.purchase}</h2>
          <div className="legacy-embed" dangerouslySetInnerHTML={{ __html: purchase.html }} />
          <a
            href={purchase.provider === "Bandcamp" ? (release.bandcampUrl ?? purchase.src) : purchase.src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-8 items-center gap-2 text-sm text-mist hover:text-ivory"
          >
            {releaseDetail.purchaseFallback}
            <ExternalIcon className="size-3.5" />
          </a>
        </section>
      ) : null}
      {hasListening ? (
        <section aria-label={releaseDetail.listen} className="mt-8">
          {purchase ? <h2 className="eyebrow mb-4">{releaseDetail.listen}</h2> : null}
          {release.embed ? (
            <LegacyEmbed
              embed={release.embed}
              fallbackHref={release.primaryPlatform?.url ?? release.embed.src}
              fallbackLabel={releaseDetail.embedFallback(release.primaryPlatform?.name ?? release.embed.provider)}
              listenLabel={releaseDetail.listen}
            />
          ) : listenHref ? (
            <Button href={listenHref} icon>{releaseDetail.listen}</Button>
          ) : null}
        </section>
      ) : null}
      {showBandcamp ? (
        <div className="mt-5">
          <Button href={release.bandcampUrl!} variant="outline" icon>{releaseDetail.bandcamp}</Button>
        </div>
      ) : null}
    </>
  );
}
