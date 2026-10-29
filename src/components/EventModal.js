"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CalendarPlus, X } from "lucide-react";
import { CATEGORIES, formatLongDate, monthBySlug } from "@/lib/calendar";
import CategoryBadge from "./CategoryBadge";
import { downloadICS } from "./DownloadCalendarButton";

export default function EventModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-title"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-2xl"
          >
            <div className="relative px-6 pb-5 pt-6 text-white" style={{ backgroundColor: CATEGORIES[event.category].color }}>
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/20 transition hover:bg-black/40"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-85">{event.tag}</p>
              <h3 id="event-title" className="mt-2 pr-10 font-display text-3xl font-semibold tracking-tight leading-tight">
                {event.title}
              </h3>
            </div>
            <div className="gold-rule" />
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-ink/[0.07] bg-sand text-center leading-none">
                  <span className="font-display text-lg font-semibold tracking-tight text-ink">{event.dateLabel}</span>
                  <span className="text-[10px] font-bold text-ink">{event.dayLabel}</span>
                </span>
                <div>
                  <p className="font-semibold text-ink">{formatLongDate(event)}</p>
                  <p className="text-sm text-ink/70">
                    {event.onwards ? "As per the board date sheet" : event.days > 1 ? `${event.days} days` : "Single day"}
                  </p>
                </div>
              </div>
              <CategoryBadge category={event.category} />
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => downloadICS([event], `${event.id}.ics`)}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-saffron"
                >
                  <CalendarPlus className="h-4 w-4" /> Add to calendar
                </button>
                <Link
                  href={`/calendar/${event.month}`}
                  onClick={onClose}
                  className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
                >
                  {monthBySlug(event.month).name} schedule
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
