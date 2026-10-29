import { BookOpenCheck, ClipboardList, GraduationCap, Medal } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import EventRow from "@/components/EventRow";
import DownloadCalendarButton from "@/components/DownloadCalendarButton";
import { EVENTS, MONTHS, SESSION, eventsByCategory, formatLongDate, parseDate } from "@/lib/calendar";

export const metadata = {
  title: "Examinations 2027-28",
  description: "Periodic assessments, half-yearly exams, pre-boards and board examinations at Gurukul Vidyapeeth, session 2027–28.",
};

const ICONS = [ClipboardList, ClipboardList, BookOpenCheck, GraduationCap, GraduationCap, Medal];
const RESULT_TITLES = ["Gandhi Jayanti & Mid-Term Result PTM", "Annual Result Declaration & PTM", "Session Break & Book Distribution"];

export default function ExaminationsPage() {
  const exams = eventsByCategory("exam").sort((a, b) => a.start.localeCompare(b.start));
  const results = RESULT_TITLES.map((t) => EVENTS.find((e) => e.title === t));
  const sessionStart = parseDate(SESSION.start);
  const sessionDays = (parseDate(SESSION.end) - sessionStart) / 86400000 + 1;
  const pos = (iso) => ((parseDate(iso) - sessionStart) / 86400000 / sessionDays) * 100;
  const examDays = exams.reduce((n, e) => n + (e.onwards ? 0 : e.days), 0);

  return (
    <>
      <PageHero
        image={photo("classrooms-16")}
        eyebrow="Assessment calendar"
        title="Examinations"
        subtitle={`${exams.length} assessment windows and ${examDays}+ days of examinations, from May 2027 to the board examinations in February 2028.`}
      >
        <DownloadCalendarButton
          events={exams}
          filename="gurukul-exams-2027-28.ics"
          label="Add exam dates"
          className="mt-8 text-white hover:bg-gold hover:text-ink"
        />
      </PageHero>

      {/* Session timeline */}
      <section className="bg-texture py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Across the session" title="Where the exams fall" />
          <Reveal className="mt-12 overflow-x-auto pb-4">
            <div className="min-w-[720px]">
              <div className="relative h-20 rounded-2xl border border-ink/[0.07] bg-white shadow-inner">
                {MONTHS.map((m, i) => (
                  <div key={m.slug} className="absolute inset-y-0 border-l border-ink/[0.07]" style={{ left: `${(i / 12) * 100}%` }} />
                ))}
                {exams.map((e) => (
                  <div
                    key={e.id}
                    title={`${e.title} — ${formatLongDate(e)}`}
                    className="absolute top-3 bottom-3 rounded-lg bg-ink shadow-lg ring-2 ring-marigold/60 transition hover:bg-saffron"
                    style={{
                      left: `${pos(e.start)}%`,
                      width: `${Math.max(1.2, e.onwards ? 4 : (e.days / sessionDays) * 100)}%`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 grid grid-cols-12 text-center text-xs font-bold text-ink/70">
                {MONTHS.map((m) => (
                  <span key={m.slug}>
                    {m.name.slice(0, 3)} &apos;{String(m.year).slice(2)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Exam cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Every window" title="Examination schedule" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((e, i) => {
              const Icon = ICONS[i] || ClipboardList;
              return (
                <Reveal key={e.id} delay={(i % 3) * 0.1}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-lg transition duration-500 hover:-translate-y-2 hover:border-maroon hover:shadow-2xl">
                    <span className="absolute -right-2 -top-6 font-display text-[8rem] font-black leading-none text-ink/5 transition group-hover:text-saffron/10">
                      {i + 1}
                    </span>
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink text-marigold shadow-lg">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="relative mt-5 font-display text-2xl font-semibold tracking-tight text-ink">{e.title}</h3>
                    <p className="relative mt-2 font-semibold text-saffron">{formatLongDate(e)}</p>
                    <div className="relative mt-5 flex items-center gap-3 border-t border-ink/[0.07] pt-4 text-sm text-ink/80">
                      <span className="rounded-full bg-leaf/10 px-3 py-1 font-bold text-leaf">{e.tag}</span>
                      <span>{e.onwards ? "As per the board date sheet" : `${e.days} days`}</span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-maroon-texture py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading light eyebrow="After the exams" title="Results, PTMs & new books" />
          <div className="mt-12 space-y-4">
            {results.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.1}>
                <EventRow event={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
