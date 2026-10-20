import { Wordmark } from "@/components/brand/Marks";
import { HeroVideo } from "@/components/media/HeroVideo";
import { Button } from "@/components/ui/Button";
import { home } from "@/lib/content/copy";
import { adidFeature, featureCta, isFeatureReady } from "@/lib/content/featured";
import { heroHasVideo, heroVideo, photos } from "@/lib/content/media";

export function Hero() {
  const c = home.hero;
  const campaign = isFeatureReady(adidFeature) ? adidFeature : null;
  const cta = campaign ? featureCta(campaign) : { label: c.listen.label, href: c.listen.href, external: false };

  return (
    <section className="hero-dossier container-site" aria-labelledby="hero-title">
      <div className="flex flex-wrap justify-between gap-2 border-t rule py-3 eyebrow"><span>Justin Waves / Sound & vision</span></div>
      <h1 id="hero-title" className="pt-3 pb-6 md:pb-8">
        <span className="sr-only">{c.h1}</span>
        <Wordmark className="block h-auto w-full text-ivory" />
      </h1>
      <div className="hero-media">
      {heroHasVideo ? (
        <HeroVideo sources={heroVideo} labels={{ pause: c.pauseVideo, play: c.playVideo }} />
      ) : (
        <div className="absolute inset-0 bg-ink">
          <picture>
            <source media="(max-width: 767px)" srcSet={photos.nightStage.srcSet} sizes="100vw" />
            <img
              src={photos.portraitNight.src}
              srcSet={photos.portraitNight.srcSet}
              sizes="100vw"
              width={photos.portraitNight.width}
              height={photos.portraitNight.height}
              alt=""
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[45%_28%] md:object-[48%_32%]"
            />
          </picture>
          <div className="absolute inset-0 vignette-mobile md:vignette" aria-hidden="true" />
        </div>
      )}

      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 border-b rule py-5">
        <p className="eyebrow">Singer / Songwriter / Producer</p>
        {campaign?.trackTitle ? (
          <p className="max-w-[22ch] font-sans text-base text-ivory/95 md:text-lg">
            {campaign.trackTitle}
            {campaign.state === "released" ? <span className="ml-2 text-mist">Out now</span> : null}
          </p>
        ) : null}
        <div>
          <Button href={cta.href} variant="primary" size="md" external={cta.external} icon={false}>
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
