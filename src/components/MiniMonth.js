import { CATEGORIES, monthGrid } from "@/lib/calendar";

const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

// Compact month grid: each day tinted with the colour of its first event.
export default function MiniMonth({ month, dark = false }) {
  const cells = monthGrid(month);
  return (
    <div>
      <div className={`grid grid-cols-7 gap-1 text-center text-[9px] font-bold ${dark ? "text-white/40" : "text-ink/35"}`}>
        {WEEK.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          if (!c) return <span key={i} />;
          const ev = c.events[0];
          const style = ev ? { backgroundColor: CATEGORIES[ev.category].color, color: "white" } : undefined;
          return (
            <span
              key={i}
              title={c.events.map((e) => e.title).join(" · ") || undefined}
              style={style}
              className={`grid aspect-square place-items-center rounded-full text-[10px] font-semibold ${
                ev ? "shadow-sm" : dark ? "text-white/50" : c.weekday === 0 ? "text-rust/70" : "text-ink/45"
              }`}
            >
              {c.day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
