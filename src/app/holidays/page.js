import { Sun } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DownloadCalendarButton from "@/components/DownloadCalendarButton";
import { MONTHS, eventsByCategory, formatLongDate } from "@/lib/calendar";

export const metadata = {
  title: "Holidays 2027-28",
  description: "Complete list of holidays and the summer vacation at Gurukul Vidyapeeth for session 2027–28.",
};

export default function HolidaysPage() {
  const holidays = eventsByCategory("holiday").sort((a, b) => a.start.localeCompare(b.start));
  const vacation = eventsByCategory("vacation");
  const byMonth = MONTHS.map((m) => ({ m, list: holidays.filter((h) => h.month === m.slug) }));
  const busiest = byMonth.reduce((a, b) => (b.list.length > a.list.length ? b : a));

  return (
    <>
      <PageHero
        image={photo("culture-15")}
        eyebrow="Plan ahead"
        title="Holidays"
        subtitle={`${holidays.length} holidays plus a month-long summer vacation in June 2027.`}
      >
        <DownloadCalendarButton
          events={[...holidays, ...vacation]}
          filename="gurukul-holidays-2027-28.ics"
          label="Add holidays to calendar"
          className="mt-8 text-white hover:bg-gold hover:text-ink"
        />
      </PageHero>

      <section className="bg-texture py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-3 sm:px-6">
          {[
            [holidays.length, "Holidays in the session"],
            [30, "Days of summer vacation"],
            [busiest.list.length, `Holidays in ${busiest.m.name}, the festive peak`],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 0.1}>
              <div className="rounded-3xl border border-ink/[0.07] bg-white p-6 text-center shadow-lg">
                <p className="font-display text-5xl font-black text-saffron">{v}</p>
                <p className="mt-2 text-sm font-semibold text-ink/80">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="Month by month" title="Holiday list 2027–28" />

          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-brown to-maroon p-6 text-white shadow-xl sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light">June 2027 · School Closed</p>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">Summer Vacation</h3>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {vacation.map((v) => (
                  <div key={v.id} className="rounded-xl border border-ink/[0.07] bg-white/10 p-3 text-center">
                    <p className="font-display text-xl font-semibold tracking-tight text-marigold">{v.dateLabel}</p>
                    <p className="text-xs uppercase tracking-wider text-white/80">June</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-4 py-4 font-display text-sm sm:px-6">#</th>
                  <th className="px-4 py-4 font-display text-sm sm:px-6">Occasion</th>
                  <th className="px-4 py-4 font-display text-sm sm:px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {byMonth.map(({ m, list }) =>
                  list.length ? <MonthRows key={m.slug} month={m} list={list} offset={holidays.indexOf(list[0])} /> : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function MonthRows({ month, list, offset }) {
  return (
    <>
      <tr className="bg-sand/60">
        <td colSpan={3} className="px-4 py-2 font-display text-sm font-semibold tracking-tight uppercase tracking-widest text-ink sm:px-6">
          {month.name} {month.year}
        </td>
      </tr>
      {list.map((h, i) => (
        <tr key={h.id} className="border-t border-ink/[0.07] transition hover:bg-white">
          <td className="px-4 py-3 text-sm font-bold text-ink/50 sm:px-6">{offset + i + 1}</td>
          <td className="px-4 py-3 sm:px-6">
            <span className="flex items-center gap-2 font-semibold text-ink">
              <Sun className="hidden h-4 w-4 shrink-0 text-saffron sm:block" /> {h.title}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-ink/80 sm:px-6">{formatLongDate(h)}</td>
        </tr>
      ))}
    </>
  );
}
