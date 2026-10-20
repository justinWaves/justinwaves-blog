import type { Metadata } from "next";
import { UnsubscribeForm } from "@/components/forms/UnsubscribeForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { Section } from "@/components/ui/Section";
import { pageMeta, unsubscribe } from "@/lib/content/copy";
import { BOOKING_EMAIL, mailto } from "@/lib/content/site";

export const metadata: Metadata = {
  title: { absolute: pageMeta.unsubscribe.title },
  description: pageMeta.unsubscribe.description,
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <>
      <PageIntro compact title={unsubscribe.heading} intro={unsubscribe.body} />
      <Section pad="none" className="pb-[clamp(3rem,6vw,6rem)]">
        <div className="max-w-xl">
          <UnsubscribeForm token={typeof token === "string" ? token : undefined} />
          <p className="mt-8 text-sm text-muted">
            {unsubscribe.help}{" "}
            <a href={mailto("Unsubscribe request")} className="text-ivory hover:text-copper-bright">
              {BOOKING_EMAIL}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
