import { CATEGORIES } from "@/lib/calendar";

// One schedule line: date tile tinted by category, title and tag.
export default function EventRow({ event, onClick, highlight = false }) {
  const cat = CATEGORIES[event.category];
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick ? () => onClick(event) : undefined}
      className={`spotlight group flex w-full items-center gap-4 rounded-2xl border bg-white p-3 text-left shadow-sm transition sm:p-3.5 ${
        highlight ? "border-saffron ring-4 ring-saffron/15" : "border-ink/[0.07]"
      } ${onClick ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg" : ""}`}
    >
      <span
        className="grid h-14 w-16 shrink-0 place-items-center rounded-xl text-center leading-none transition group-hover:scale-105"
        style={{ backgroundColor: cat.soft, color: cat.color }}
      >
        <span className="font-display text-lg font-bold">{event.dateLabel}</span>
        <span className="text-[10px] font-bold tracking-wide opacity-80">{event.dayLabel}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-semibold leading-snug tracking-tight text-ink sm:text-[17px]">{event.title}</span>
        <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: cat.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
          {event.tag}
        </span>
      </span>
    </Comp>
  );
}
