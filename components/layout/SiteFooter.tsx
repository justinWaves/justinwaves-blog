import Link from "next/link";
import { PlatformIcon } from "@/components/brand/Icons";
import { WaveMark, Wordmark } from "@/components/brand/Marks";
import { BOOKING_EMAIL, listenPlatforms, mailto, primaryNav, shell, socialPlatforms } from "@/lib/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const nav = primaryNav();
  return (
    <footer className="border-t rule bg-ink-deep">
      <div className="container-site py-8 md:py-10">
        <div className="flex flex-col gap-6 border-b rule pb-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex w-fit items-center gap-3 text-ivory hover:text-copper-bright transition-colors" aria-label="Justin Waves — home">
            <WaveMark className="h-8 w-auto shrink-0" />
            <Wordmark className="h-auto w-[min(64vw,16rem)]" />
          </Link>
          <div className="min-w-0 md:text-right">
            <p className="eyebrow">{shell.footerContactLabel}</p>
            <a href={mailto()} className="inline-flex min-h-11 items-center break-all text-base text-ivory hover:text-copper-bright">
              {BOOKING_EMAIL}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 py-6 sm:grid-cols-3 sm:gap-10">
          <nav aria-label="Footer" className="col-span-2 sm:col-span-1">
            <p className="eyebrow mb-2">Explore</p>
            <ul className="grid grid-cols-2 sm:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-sm text-ivory hover:text-copper-bright">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {[{ label: "Listen", links: listenPlatforms }, { label: "Connect", links: socialPlatforms }].map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="eyebrow mb-2">{group.label}</p>
              <ul>
                {group.links.map((platform) => (
                  <li key={platform.key}>
                    <a href={platform.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2.5 text-sm text-ivory hover:text-copper-bright">
                      <PlatformIcon platform={platform.key} className="size-4 shrink-0" />
                      {platform.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t rule pt-5 text-xs leading-relaxed text-muted">
          <p>{shell.copyright(year)}</p>
          <p className="order-3 w-full sm:order-none sm:w-auto">
            {shell.builderCreditHref ? (
              <a href={shell.builderCreditHref} className="hover:text-ivory">{shell.builderCredit}</a>
            ) : shell.builderCredit}
          </p>
          <Link href={shell.footerUnsubscribe.href} className="inline-flex min-h-8 items-center hover:text-ivory">
            {shell.footerUnsubscribe.label}
          </Link>
        </div>
      </div>
    </footer>
  );
}
