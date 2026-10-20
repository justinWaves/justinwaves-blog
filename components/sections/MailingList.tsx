import { MailingListForm } from "@/components/forms/MailingListForm";
import { Section } from "@/components/ui/Section";
import { mailingList } from "@/lib/content/copy";

export function MailingList({ source = "home" }: { source?: "home" | "live" | "music" }) {
  return (
    <Section pad="lg" id="subscribe" ariaLabelledby="mailing-list-title" className="border-t rule scroll-mt-[var(--header-height)]">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="mailing-list-title" className="section-label">
            {mailingList.heading}
          </h2>
          <p className="mt-4 max-w-sm text-muted">{mailingList.body}</p>
        </div>
        <div className="lg:col-span-7">
          <MailingListForm source={source} />
        </div>
      </div>
    </Section>
  );
}
