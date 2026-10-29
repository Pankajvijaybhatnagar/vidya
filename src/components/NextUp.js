"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import { CATEGORIES, EVENTS, SESSION, formatLongDate, parseDate } from "@/lib/calendar";

function todayISO(now) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

// Picks the event in progress or the next one to come; before the session it counts down to day one.
function pickEvents(now) {
  const t = todayISO(now);
  const sorted = [...EVENTS].sort((a, b) => a.start.localeCompare(b.start));
  const upcoming = sorted.filter((e) => e.end >= t);
  return upcoming.length ? upcoming.slice(0, 4) : sorted.slice(-1);
}

function diff(target, now) {
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export default function NextUp() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  if (!now) {
    return <div className="glass h-[25rem] w-full max-w-md animate-pulse rounded-3xl" />;
  }

  const list = pickEvents(now);
  const next = list[0];
  const start = parseDate(next.start);
  const target = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const running = next.start <= todayISO(now) && todayISO(now) <= next.end;
  const before = todayISO(now) < SESSION.start;
  const d = diff(target, now);
  const cat = CATEGORIES[next.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass ring-gradient w-full max-w-md rounded-3xl p-5 text-white shadow-2xl shadow-black/40"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
          </span>
          {running ? "Happening now" : before ? "Session begins in" : "Coming up next"}
        </span>
        <Clock className="h-4 w-4 text-white/50" />
      </div>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-widest" style={{ color: cat.soft }}>
        {next.tag}
      </p>
      <h3 className="mt-1 font-display text-2xl font-semibold leading-snug tracking-tight">{next.title}</h3>
      <p className="mt-1 text-sm text-white/55">{formatLongDate(next)}</p>

      {!running && (
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {[
            ["Days", d.days],
            ["Hours", d.hours],
            ["Mins", d.minutes],
            ["Secs", d.seconds],
          ].map(([label, v]) => (
            <div key={label} className="rounded-2xl bg-white/[0.06] py-3 ring-1 ring-white/10">
              <p className="font-display text-3xl font-semibold tabular-nums">{String(v).padStart(2, "0")}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
            </div>
          ))}
        </div>
      )}

      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
        {list.slice(1).map((e) => (
          <li key={e.id} className="flex items-center gap-3">
            <span
              className="grid h-10 w-11 shrink-0 place-items-center rounded-xl text-center leading-none"
              style={{ backgroundColor: CATEGORIES[e.category].color }}
            >
              <span className="font-display text-sm font-bold">{e.dateLabel}</span>
              <span className="text-[8px] font-bold opacity-80">{e.dayLabel}</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{e.title}</span>
              <span className="block text-[10px] uppercase tracking-wider text-white/45">{e.tag}</span>
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={`/calendar/${next.month}`}
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-ink transition hover:bg-gold-light"
      >
        Open {next.month.split("-")[0].replace(/^\w/, (c) => c.toUpperCase())} schedule <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
