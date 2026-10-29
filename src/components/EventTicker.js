import { CATEGORIES, EVENTS } from "@/lib/calendar";

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EventTicker() {
  const items = [...EVENTS].sort((a, b) => a.start.localeCompare(b.start));
  const row = (hidden) => (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((e) => (
        <span key={e.id} className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white/[0.06] py-1.5 pl-1.5 pr-4 ring-1 ring-white/10">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ backgroundColor: CATEGORIES[e.category].color }}>
            {e.dateLabel} {MONTH_SHORT[Number(e.start.slice(5, 7)) - 1]}
          </span>
          <span className="text-sm font-medium text-white/85">{e.title}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden bg-ink py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
