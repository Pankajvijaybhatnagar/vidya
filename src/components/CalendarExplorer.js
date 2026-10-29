"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, LayoutGrid, List, Printer, Search, CalendarRange, X } from "lucide-react";
import { CATEGORIES, EVENTS, MONTHS, monthGrid } from "@/lib/calendar";
import EventModal from "./EventModal";
import EventRow from "./EventRow";
import DownloadCalendarButton from "./DownloadCalendarButton";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const VIEWS = [
  { id: "month", label: "Month", icon: LayoutGrid },
  { id: "agenda", label: "Agenda", icon: List },
  { id: "year", label: "Year", icon: CalendarRange },
];

function localISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function CalendarExplorer() {
  const [monthIdx, setMonthIdx] = useState(0);
  const [view, setView] = useState("month");
  const [active, setActive] = useState(() => new Set(Object.keys(CATEGORIES)));
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [today, setToday] = useState(null);
  const [dir, setDir] = useState(1);

  // Jump to the current month when today falls inside the session.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const now = new Date();
      setToday(localISO(now));
      const idx = MONTHS.findIndex((m) => m.year === now.getFullYear() && m.index === now.getMonth());
      if (idx >= 0) setMonthIdx(idx);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const matches = useCallback(
    (e) => active.has(e.category) && (!query || `${e.title} ${e.tag}`.toLowerCase().includes(query.toLowerCase())),
    [active, query]
  );

  const filtered = useMemo(() => EVENTS.filter(matches).sort((a, b) => a.start.localeCompare(b.start)), [matches]);
  const month = MONTHS[monthIdx];
  const cells = useMemo(() => monthGrid(month), [month]);
  const closeModal = useCallback(() => setSelected(null), []);

  const go = (delta) => {
    setDir(delta);
    setMonthIdx((i) => Math.min(MONTHS.length - 1, Math.max(0, i + delta)));
  };

  const toggle = (k) =>
    setActive((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });

  const allOn = active.size === Object.keys(CATEGORIES).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Toolbar */}
      <div className="no-print sticky top-[76px] z-30 -mx-4 mb-8 border-b border-ink/[0.07] bg-[#fffbf5]/85 sm:top-[84px] px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex rounded-full border border-ink/[0.07] bg-white p-1 shadow-sm">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                  view === v.id ? "text-white" : "text-ink hover:text-saffron"
                }`}
              >
                {view === v.id && (
                  <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", damping: 25, stiffness: 300 }} />
                )}
                <v.icon className="relative h-4 w-4" />
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-3 lg:justify-end">
            <label className="relative min-w-[200px] flex-1 lg:max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, festivals…"
                aria-label="Search events"
                className="w-full rounded-full border border-ink/[0.07] bg-white py-2.5 pl-11 pr-10 text-sm text-ink outline-none transition focus:border-saffron"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/60">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
            <DownloadCalendarButton
              events={filtered}
              label="Export .ics"
              className="!px-4 !py-2 text-sm text-ink hover:bg-gold"
            />
          </div>
        </div>

        <div className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActive(new Set(allOn ? [] : Object.keys(CATEGORIES)))}
            className="shrink-0 rounded-full border border-ink/15 px-3 py-1 text-xs font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            {allOn ? "Clear all" : "Show all"}
          </button>
          {Object.entries(CATEGORIES).map(([k, c]) => {
            const on = active.has(k);
            const count = EVENTS.filter((e) => e.category === k).length;
            return (
              <button
                key={k}
                onClick={() => toggle(k)}
                aria-pressed={on}
                className="flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-bold transition"
                style={{
                  borderColor: c.color,
                  backgroundColor: on ? c.color : "transparent",
                  color: on ? "white" : c.color,
                }}
              >
                {c.label}
                <span className="rounded-full bg-black/15 px-1.5 text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "month" && (
          <motion.div key="month" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Month switcher */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <button
                onClick={() => go(-1)}
                disabled={monthIdx === 0}
                aria-label="Previous month"
                className="no-print grid h-12 w-12 place-items-center rounded-full border border-ink/[0.07] bg-white text-ink shadow transition hover:bg-gold disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.h2
                    key={month.slug}
                    initial={{ opacity: 0, x: 40 * dir }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 * dir }}
                    className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
                  >
                    {month.name} <span className="text-saffron">{month.year}</span>
                  </motion.h2>
                </AnimatePresence>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.3em] text-ink/60">Schedule & Events</p>
              </div>
              <button
                onClick={() => go(1)}
                disabled={monthIdx === MONTHS.length - 1}
                aria-label="Next month"
                className="no-print grid h-12 w-12 place-items-center rounded-full border border-ink/[0.07] bg-white text-ink shadow transition hover:bg-gold disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="scrollbar-none no-print mb-6 flex gap-2 overflow-x-auto pb-2">
              {MONTHS.map((m, i) => (
                <button
                  key={m.slug}
                  onClick={() => {
                    setDir(i > monthIdx ? 1 : -1);
                    setMonthIdx(i);
                  }}
                  className={`shrink-0 rounded-xl border-2 px-3 py-1.5 text-xs font-bold transition ${
                    i === monthIdx ? "border-rust bg-ink text-white shadow-lg" : "border-ink/[0.07] bg-white text-ink hover:border-saffron/40/40"
                  }`}
                >
                  {m.name.slice(0, 3)} ’{String(m.year).slice(2)}
                </button>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="self-start overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-xl">
                <div className="grid grid-cols-7 bg-ink text-center text-xs font-bold uppercase tracking-wider text-white">
                  {WEEK.map((d) => (
                    <div key={d} className="py-3">
                      <span className="hidden sm:inline">{d}</span>
                      <span className="sm:hidden">{d[0]}</span>
                    </div>
                  ))}
                </div>
                <div className="gold-rule" />
                <div className="grid grid-cols-7">
                  {cells.map((c, i) => {
                    if (!c) return <div key={i} className="min-h-16 border-b border-r border-ink/[0.07] bg-ink/[0.02] sm:min-h-28" />;
                    const evs = c.events.filter(matches);
                    const isToday = c.iso === today;
                    return (
                      <div
                        key={i}
                        className={`relative min-h-16 border-b border-r border-ink/[0.07] p-1 transition sm:min-h-28 sm:p-1.5 ${
                          evs.length ? "bg-white/60" : ""
                        } ${isToday ? "ring-2 ring-inset ring-saffron" : ""}`}
                      >
                        <span
                          className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                            isToday ? "bg-saffron text-white" : c.weekday === 0 ? "text-rust" : "text-ink/80"
                          }`}
                        >
                          {c.day}
                        </span>
                        <div className="mt-1 space-y-1">
                          {evs.slice(0, 2).map((e) => (
                            <button
                              key={e.id}
                              onClick={() => setSelected(e)}
                              title={e.title}
                              className="block w-full truncate rounded-md px-1 py-0.5 text-left text-[9px] font-semibold text-white shadow-sm transition hover:brightness-110 sm:px-1.5 sm:text-[11px]"
                              style={{ backgroundColor: CATEGORIES[e.category].color }}
                            >
                              <span className="hidden sm:inline">{e.title}</span>
                              <span className="sm:hidden">•</span>
                            </button>
                          ))}
                          {evs.length > 2 && (
                            <button onClick={() => setSelected(evs[2])} className="text-[10px] font-bold text-saffron">
                              +{evs.length - 2}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  <span className="text-saffron">▦</span> Schedule & Events
                </h3>
                <AnimatePresence mode="popLayout">
                  <motion.div key={month.slug + query + active.size} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {filtered.filter((e) => e.month === month.slug).map((e, i) => (
                      <motion.div key={e.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                        <EventRow event={e} onClick={setSelected} highlight={today && e.start <= today && today <= e.end} />
                      </motion.div>
                    ))}
                    {!filtered.some((e) => e.month === month.slug) && (
                      <p className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-ink/60">
                        No entries match your filters this month.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {view === "agenda" && (
          <motion.div key="agenda" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            <p className="text-center text-sm font-semibold text-ink/70">
              Showing {filtered.length} of {EVENTS.length} entries
            </p>
            {MONTHS.map((m) => {
              const evs = filtered.filter((e) => e.month === m.slug);
              if (!evs.length) return null;
              return (
                <section key={m.slug} className="grid gap-6 md:grid-cols-[200px_1fr]">
                  <div className="md:sticky md:top-64 md:self-start">
                    <div className="rounded-2xl bg-ink px-5 py-4 text-white shadow-lg">
                      <p className="font-display text-3xl font-semibold tracking-tight">{m.name}</p>
                      <p className="text-sm tracking-[0.3em] text-white/80">{m.year}</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {evs.map((e) => (
                      <EventRow key={e.id} event={e} onClick={setSelected} highlight={today && e.start <= today && today <= e.end} />
                    ))}
                  </div>
                </section>
              );
            })}
            {!filtered.length && (
              <p className="rounded-2xl border border-dashed border-ink/15 p-12 text-center text-ink/60">No entries match your filters.</p>
            )}
          </motion.div>
        )}

        {view === "year" && (
          <motion.div key="year" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MONTHS.map((m, mi) => (
              <button
                key={m.slug}
                onClick={() => {
                  setMonthIdx(mi);
                  setView("month");
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="group overflow-hidden rounded-3xl border border-ink/[0.07] bg-white text-left shadow-md transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-xl"
              >
                <div className="flex items-baseline justify-between bg-ink px-4 py-2.5 text-white">
                  <span className="font-display text-xl font-semibold tracking-tight">{m.name}</span>
                  <span className="text-xs tracking-widest text-white/70">{m.year}</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-ink/50">
                    {WEEK.map((d) => (
                      <span key={d}>{d[0]}</span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {monthGrid(m).map((c, i) => {
                      if (!c) return <span key={i} />;
                      const ev = c.events.find(matches);
                      return (
                        <span
                          key={i}
                          title={c.events.filter(matches).map((e) => e.title).join(" · ") || undefined}
                          className={`grid aspect-square place-items-center rounded-md text-[10px] font-semibold ${
                            c.iso === today ? "ring-2 ring-saffron" : ""
                          } ${ev ? "text-white" : "text-ink/60"}`}
                          style={ev ? { backgroundColor: CATEGORIES[ev.category].color } : undefined}
                        >
                          {c.day}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <EventModal event={selected} onClose={closeModal} />
    </div>
  );
}
