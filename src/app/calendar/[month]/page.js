import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import EventRow from "@/components/EventRow";
import MiniMonth from "@/components/MiniMonth";
import CategoryBadge from "@/components/CategoryBadge";
import Reveal from "@/components/Reveal";
import DownloadCalendarButton from "@/components/DownloadCalendarButton";
import { CATEGORIES, MONTHS, SUMMER_CAMPS, eventsForMonth, monthBySlug } from "@/lib/calendar";
import { SITE } from "@/lib/site";

// Every month is prerendered below; an unknown month just blocks briefly before the 404.
export const instant = false;

export function generateStaticParams() {
  return MONTHS.map((m) => ({ month: m.slug }));
}

export async function generateMetadata({ params }) {
  const { month } = await params;
  const m = monthBySlug(month);
  if (!m) return {};
  return {
    title: `${m.name} ${m.year} Schedule`,
    description: `Schedule and events at Gurukul Vidyapeeth for ${m.name} ${m.year}.`,
  };
}

export default async function MonthPage({ params }) {
  const { month } = await params;
  const m = monthBySlug(month);
  if (!m) notFound();

  const events = eventsForMonth(m.slug);
  const i = MONTHS.indexOf(m);
  const prev = MONTHS[i - 1];
  const next = MONTHS[i + 1];
  const cats = [...new Set(events.map((e) => e.category))];
  // Alternate the Hindi and English taglines as the slides do.
  const tagline = m.page % 2 === 0 ? SITE.taglineHi : SITE.tagline;

  return (
    <>
      <PageHero eyebrow={`Page ${m.page} · Session 2027–28`} title={`${m.name} ${m.year}`}>
        <p className={`mt-4 text-lg text-white/85 ${m.page % 2 === 0 ? "font-hindi text-xl" : "italic"}`}>{tagline}</p>
      </PageHero>

      <section className="bg-texture py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white shadow-2xl">
              <div className="flex items-center justify-between gap-4 bg-ink px-6 py-4 text-white">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {m.name.toUpperCase()} {m.year}
                </h2>
                <Image src="/kalash.png" alt="" width={44} height={44} />
              </div>
              <div className="gold-rule" />
              <div className="p-5 sm:p-8">
                <h3 className="mb-5 flex items-center gap-3 font-display text-lg font-semibold tracking-tight uppercase tracking-wider text-ink">
                  ▦ Schedule & Events
                  <span className="h-px flex-1 bg-gold" />
                </h3>
                <div className="space-y-3">
                  {events.map((e, idx) => (
                    <Reveal key={e.id} delay={idx * 0.05} y={16}>
                      <EventRow event={e} />
                    </Reveal>
                  ))}
                </div>

                {m.slug === "june-2027" && (
                  <div className="mt-8 rounded-2xl border-2 border-dashed border-leaf/50 bg-white/70 p-6">
                    <h4 className="font-display text-xl font-semibold tracking-tight text-leaf">Summer Camps & Workshops</h4>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {SUMMER_CAMPS.map((c) => (
                        <li key={c.title} className="flex items-center gap-2 font-semibold text-ink">
                          <span className="text-saffron">✦</span> {c.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between bg-ink px-6 py-3 text-xs text-white/80">
                <span className="font-display font-semibold">{SITE.name}</span>
                <span>Page {m.page}</span>
              </div>
            </div>
          </Reveal>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-ink/[0.07] bg-white p-5 shadow-lg">
                <p className="mb-3 font-display text-lg font-semibold tracking-tight text-ink">
                  {m.name} at a glance
                </p>
                <MiniMonth month={m} />
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cats.map((c) => (
                    <CategoryBadge key={c} category={c} />
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-3xl bg-ink p-5 text-white shadow-lg">
                <p className="font-display text-lg font-semibold tracking-tight">This month</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {cats.map((c) => (
                    <li key={c} className="flex justify-between">
                      <span>{CATEGORIES[c].label}</span>
                      <span className="font-bold text-marigold">{events.filter((e) => e.category === c).length}</span>
                    </li>
                  ))}
                </ul>
                <DownloadCalendarButton
                  events={events}
                  filename={`gurukul-vidyapeeth-${m.slug}.ics`}
                  label={`Add ${m.name} to calendar`}
                  className="mt-5 w-full justify-center !px-4 text-sm text-white hover:bg-gold hover:text-ink"
                />
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {prev ? (
            <Link href={`/calendar/${prev.slug}`} className="group flex items-center gap-3 rounded-full border border-ink/15 px-5 py-3 font-bold text-ink transition hover:bg-ink hover:text-white">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> {prev.name} {prev.year}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/calendar/${next.slug}`} className="group flex items-center gap-3 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-saffron">
              {next.name} {next.year} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link href="/calendar" className="rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-saffron">
              Full calendar
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
