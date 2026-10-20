import { Button } from "@/components/ui/Button";
import type { Show } from "@/lib/content/shows";

type ListedShow = Show & { past?: boolean };

export function ShowList({
  shows,
  ticketsLabel,
  pastBadge,
  formatDate,
}: {
  shows: readonly ListedShow[];
  ticketsLabel: string;
  pastBadge?: string;
  formatDate: (show: Show) => string;
}) {
  return (
    <ul className="divide-y rule border-y rule" role="list">
      {shows.map((show) => (
        <li key={show.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-2 py-4 md:grid md:grid-cols-12 md:items-center">
          <time dateTime={show.start} className="font-mono text-sm text-ivory md:col-span-3">
            {formatDate(show)}
          </time>
          <p className="text-ivory md:col-span-6">
            {show.city}
            <span className="text-muted"> · {show.venue}</span>
          </p>
          <div className="md:col-span-3 md:text-right">
            {show.past && pastBadge ? (
              <span className="text-xs tracking-[0.14em] uppercase text-mist">{pastBadge}</span>
            ) : show.ticketUrl ? (
              <Button href={show.ticketUrl} variant="outline" icon={false} className="min-h-10 px-4 text-sm">
                {ticketsLabel}
              </Button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
