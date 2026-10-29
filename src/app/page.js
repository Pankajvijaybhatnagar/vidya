import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  Flame,
  GraduationCap,
  Landmark,
  Music,
  PartyPopper,
  Sparkles,
  Sun,
  Trophy,
  Waves,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading, { Eyebrow } from "@/components/SectionHeading";
import NextUp from "@/components/NextUp";
import SymbolExplorer from "@/components/SymbolExplorer";
import EventTicker from "@/components/EventTicker";
import AnimatedCounter from "@/components/AnimatedCounter";
import MiniMonth from "@/components/MiniMonth";
import CategoryBadge from "@/components/CategoryBadge";
import Portrait from "@/components/Portrait";
import DownloadCalendarButton from "@/components/DownloadCalendarButton";
import { CATEGORIES, EVENTS, MONTHS, STATS, SUMMER_CAMPS, SESSION, eventsByCategory, eventsForMonth, formatLongDate } from "@/lib/calendar";
import { ABOUT, MESSAGES, MILESTONES, TEACHERS_LINE, VISION } from "@/lib/content";
import { ALBUMS, PHOTOS, photo } from "@/lib/gallery";
import HeroSlideshow from "@/components/HeroSlideshow";
import Photo from "@/components/Photo";
import PhotoMosaic from "@/components/PhotoMosaic";
import { AchievementGrid, ProgrammeStrip } from "@/components/SchoolFacts";
import { SITE } from "@/lib/site";

const QUICK = [
  { icon: CalendarDays, title: "Academic Calendar", hint: "Month, agenda & year views", href: "/calendar" },
  { icon: GraduationCap, title: "Examinations", hint: "PA, half-yearly, pre-boards", href: "/examinations" },
  { icon: Sun, title: "Holidays", hint: `${STATS.holidays} holidays + summer break`, href: "/holidays" },
  { icon: Trophy, title: "Activities", hint: "Celebrations & camps", href: "/activities" },
];

const FESTIVALS = ["Deepawali", "Holi", "Raksha Bandhan", "Janmashtami Celebrations", "Dussehra Celebration", "Makar Sankranti"];
const FESTIVAL_ICONS = [Flame, Sparkles, Sun, Music, PartyPopper, Sun];
const CAMP_ICONS = { music: Music, sparkles: Sparkles, waves: Waves };

// Home-page highlights, one or two per album.
// Hero background rotation — wide, well-lit shots that read well behind text.
const HERO_SLIDES = ["campus-07", "annual-08", "balvatika-05", "havan-09", "lab-03", "sports-12", "annual-26", "campus-09"];

// Founder and Co-Founder are featured; the rest follow in a row.
const FEATURED = ["founder", "co-founder"];

const HIGHLIGHTS = ["annual-08", "balvatika-05", "lab-03", "havan-09", "culture-02", "sports-12", "classrooms-11", "annual-26", "campus-11"];

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortRange(e) {
  const mon = MONTH_SHORT[Number(e.start.slice(5, 7)) - 1];
  if (e.onwards) return `From ${Number(e.start.slice(8))} ${mon} ${e.start.slice(0, 4)}`;
  return `${e.dateLabel.replace("-", "–")} ${mon} ${e.start.slice(0, 4)} · ${e.days} days`;
}

// The verse or line each leader's message opens with.
function keyQuote(m) {
  return m.lead || m.blocks.find((b) => b.quote);
}

function excerpt(m) {
  return m.lead?.quote || m.blocks.find((b) => b.p).p;
}

export default function Home() {
  const exams = eventsByCategory("exam").sort((a, b) => a.start.localeCompare(b.start));
  const festivals = FESTIVALS.map((t) => EVENTS.find((e) => e.title === t));

  return (
    <>
      {/* HERO */}
      <section className="bg-maroon-texture relative overflow-hidden pt-28 lg:pt-[9.5rem]">
        <HeroSlideshow photos={HERO_SLIDES.map(photo)} />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/85 via-maroon-deep/65 to-maroon-deep/45 md:via-maroon-deep/45 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/75 via-transparent to-transparent" />
        <div className="animate-blob pointer-events-none absolute -left-32 top-24 h-[26rem] w-[26rem] rounded-full bg-saffron/20 blur-3xl" />
        <div className="animate-blob pointer-events-none absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#8c181c]/45 blur-3xl [animation-delay:-8s]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20">
          <div className="[text-shadow:0_2px_14px_rgb(23_9_9/0.55)]">
            <Reveal>
              <p className="border-l-2 border-saffron pl-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-light">
                Vinay Bal Mandir · Est. {SITE.established}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl">
                Gurukul <span className="text-gold-gradient [text-shadow:none] drop-shadow-[0_2px_10px_rgb(23_9_9/0.45)]">Vidyapeeth</span>
              </h1>
              <p className="font-hindi mt-4 text-xl font-medium text-white/90 sm:text-2xl">{SITE.nameHi}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-7 h-px w-24 bg-gradient-to-r from-saffron to-transparent" />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                {SITE.tagline} in {SITE.city}, {SITE.state} — recognised by the Government of Haryana and affiliated to the Board of School
                Education Haryana, Bhiwani.
              </p>
              <p className="font-hindi mt-2 text-white/55">{SITE.taglineHi}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary group inline-flex items-center gap-2 rounded-lg px-6 py-3.5 font-bold text-white transition hover:brightness-110">
                  Discover the Vidyapeeth
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/calendar"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 font-bold text-white transition hover:border-white/50 hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" /> Academic Calendar {SESSION.label}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  [Landmark, String(SITE.established), "Founded"],
                  [Award, "BSEH", "Bhiwani affiliated"],
                  [GraduationCap, "Nur–12th", "Classes · 3 streams"],
                ].map(([Icon, v, l]) => (
                  <div key={l} className="flex items-center gap-3">
                    <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-saffron ring-1 ring-white/10 sm:grid">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <dt className="font-display text-xl font-semibold text-white sm:text-2xl">{v}</dt>
                      <dd className="text-[11px] uppercase tracking-wider text-white/50">{l}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Arched emblem panel — a nod to the gurukul gateway */}
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-[22rem] lg:max-w-[25rem]">
            <div className="absolute inset-[10%] rounded-full bg-saffron/30 blur-3xl" />
            <div className="relative rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-b from-cream to-sand p-3 shadow-2xl ring-1 ring-gold/50">
              <div className="flex aspect-[5/6] flex-col items-center justify-center rounded-t-[999px] rounded-b-[1.5rem] border border-gold/60 px-8 pb-4 pt-10 text-center">
                <Image src="/logo.png" alt="Vidyapeeth emblem" width={220} height={220} preload className="w-[62%] rounded-full drop-shadow-xl" />
                <p className="font-sanskrit mt-6 text-3xl text-maroon">{SITE.motto}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em] text-rust">{SITE.mottoMeaning}</p>
                <p className="font-hindi mt-3 text-xs text-ink/50">{SITE.mottoSource}</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl sm:-left-10">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-saffron/10 text-saffron">
                <Landmark className="h-5 w-5" />
              </span>
              <span>
                <span className="font-hindi block text-xs text-ink/50">स्थापना</span>
                <span className="font-hindi block font-semibold text-ink">{SITE.foundedHi}</span>
              </span>
            </div>
            <div className="absolute -right-3 top-[18%] flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl sm:-right-8">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-leaf/10 text-leaf">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-ink/50">Session</span>
                <span className="block font-semibold text-ink">{SESSION.label}</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Quick access bar */}
        <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
            {QUICK.map((q, i) => (
              <Link
                key={q.href}
                href={q.href}
                className={`group flex items-center gap-3 py-5 pr-3 transition sm:gap-4 ${i > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""} ${
                  i % 2 === 1 ? "border-l border-white/10 pl-4 lg:pl-6" : ""
                } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-saffron/15 text-saffron transition group-hover:bg-saffron group-hover:text-white">
                  <q.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-sm font-semibold leading-tight text-white sm:truncate sm:text-base">{q.title}</span>
                  <span className="hidden truncate text-xs text-white/50 sm:block">{q.hint}</span>
                </span>
                <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-white/30 transition group-hover:text-saffron sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EventTicker />

      {/* BENTO — AT A GLANCE */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="left" eyebrow={`स्थापना · ${SITE.foundedHi}`} title={<>Modern education, <span className="text-brand-gradient">rooted in sanskar.</span></>} />
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:row-span-2">
              <div className="bg-maroon-texture flex h-full items-center justify-center rounded-[2rem] p-4 sm:p-6">
                <NextUp />
              </div>
            </Reveal>

            <Reveal delay={0.05} className="lg:col-span-7">
              <div className="spotlight h-full rounded-[2rem] border border-ink/[0.07] bg-white p-7 shadow-sm sm:p-9">
                <p className="font-hindi text-lg leading-[1.9] text-ink/75">{ABOUT.paragraphs[0]}</p>
                <Link href="/about" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-saffron">
                  Read our story <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-saffron to-rust p-7 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Since</p>
                <p className="font-display text-7xl font-semibold tracking-tighter">2012</p>
                <p className="font-hindi mt-2 text-white/85">
                  {MILESTONES[0].date} · {MILESTONES[0].title}
                </p>
                <span className="absolute -bottom-10 -right-6 font-display text-[9rem] font-bold leading-none text-white/10">VB</span>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-4">
              <div className="spotlight h-full rounded-[2rem] border border-ink/[0.07] bg-white p-7 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf/10 text-leaf">
                  <Award className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold leading-snug text-ink">Recognised & affiliated</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{SITE.affiliation}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-4">
                {[
                  ["Months planned", MONTHS.length],
                  ["Calendar entries", STATS.events],
                  ["Holidays", STATS.holidays],
                  ["Celebrations", STATS.celebrations],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col justify-end bg-white p-6">
                    <p className="font-display text-5xl font-semibold tracking-tight text-ink">
                      <AnimatedCounter value={value} />
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/45">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <Link
                href="/balvatika"
                className="group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[2rem] p-7 shadow-sm transition hover:shadow-lg"
              >
                <Photo photo={photo("balvatika-13")} alt="" sizes="(min-width: 1024px) 40vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />
                <div className="relative">
                  <p className="font-hindi text-sm font-medium text-gold-light">बालवाटिका भवन</p>
                  <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">Balvatika — a home for our youngest learners</p>
                </div>
                <div className="relative mt-6 flex items-end justify-between">
                  <div className="flex gap-6 text-sm">
                    <span>
                      <span className="font-hindi block text-white/60">शुभारम्भ</span>
                      <span className="font-hindi font-semibold text-white">{MILESTONES[2].date}</span>
                    </span>
                    <span>
                      <span className="font-hindi block text-white/60">लोकार्पण</span>
                      <span className="font-hindi font-semibold text-white">{MILESTONES[3].date}</span>
                    </span>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition group-hover:bg-saffron">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-texture relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-saffron/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="मार्गदर्शक · संदेश"
              title={<>Guided by our <span className="text-brand-gradient">leadership</span></>}
              subtitle="Founded on 24 May 2012 in the loving memory of Late Shri Vinay Bansal — the vision of our founders, carried forward every day by our teachers."
            />
            <Link
              href="/messages"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              All messages <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Founder & Co-Founder */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {FEATURED.map((slug, i) => {
              const m = MESSAGES.find((x) => x.slug === slug);
              const q = keyQuote(m);
              return (
                <Reveal key={slug} delay={i * 0.1}>
                  <Link
                    href={`/messages/${slug}`}
                    className="bg-maroon-texture group relative flex h-full flex-col items-center gap-7 overflow-hidden rounded-[2.5rem] p-8 text-center shadow-2xl transition duration-500 hover:-translate-y-1.5 sm:flex-row sm:items-start sm:p-10 sm:text-left"
                  >
                    <span className="pointer-events-none absolute -right-6 -top-10 font-display text-[12rem] leading-none text-white/[0.04]">“</span>
                    <div className="relative flex flex-col items-center">
                      <Portrait message={m} size="xl" />
                      <span className="font-hindi relative z-10 -mt-4 rounded-full bg-gradient-to-r from-saffron to-rust px-5 py-1.5 text-sm font-semibold text-white shadow-lg ring-4 ring-maroon-deep">
                        {m.roleHi}
                      </span>
                    </div>
                    <div className="relative flex flex-1 flex-col">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-light">{m.role.replace("'s Message", "")}</p>
                      <h3 className="font-hindi mt-2 text-2xl font-semibold leading-snug text-white sm:text-[1.7rem]">{m.name}</h3>
                      <p className="mt-1 text-sm text-white/55">{m.nameEn}</p>
                      {q && (
                        <blockquote className="mt-6 border-l-2 border-saffron pl-4 text-left">
                          <p className="font-sanskrit text-xl leading-relaxed text-marigold">{q.quote}</p>
                          {q.gloss && <p className="font-hindi mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">{q.gloss}</p>}
                        </blockquote>
                      )}
                      <span className="mt-7 inline-flex items-center gap-2 self-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink transition group-hover:bg-saffron group-hover:text-white sm:self-start">
                        Read the message <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Vice-Chairperson, Principal, Balvatika Coordinator */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {MESSAGES.filter((m) => !FEATURED.includes(m.slug)).map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.08}>
                <Link
                  href={`/messages/${m.slug}`}
                  className="spotlight group flex h-full flex-col items-center rounded-[2rem] border border-ink/[0.07] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-saffron/40 hover:shadow-2xl"
                >
                  <Portrait message={m} size="lg" />
                  <span className="font-hindi mt-5 rounded-full bg-saffron/10 px-4 py-1 text-sm font-semibold text-rust">{m.roleHi}</span>
                  <h3 className="font-hindi mt-3 text-xl font-semibold leading-snug text-ink">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-ink/50">
                    {m.nameEn}
                    {m.credentials ? ` · ${m.credentials}` : ""}
                  </p>
                  <p className="font-hindi mt-5 line-clamp-4 flex-1 leading-relaxed text-ink/70">“{excerpt(m)}”</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-saffron transition group-hover:gap-2.5">
                    Read the message <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="हमारी विशेषताएँ"
              title={<>Why <span className="text-brand-gradient">Vinay Bal Mandir</span></>}
              subtitle={`${TEACHERS_LINE.en} — and a record our families can trust.`}
            />
            <Link
              href="/about#facilities"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              Our facilities <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <AchievementGrid />
          </div>
          <div className="mt-4">
            <ProgrammeStrip />
          </div>
          <Reveal className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[#eef2e6] p-6 text-center sm:flex-row sm:p-8 sm:text-left">
            <div>
              <p className="font-display text-xl font-semibold text-ink">Admissions · session {SESSION.label}</p>
              <p className="text-ink/60">Nursery to Class 12 · see the fee structure or call the Vidyapeeth office.</p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <Link href="/fees" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-saffron">
                Fee structure
              </Link>
              <Link href="/contact" className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-saffron">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIFE AT THE VIDYAPEETH */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="छायाचित्र दीर्घा"
              title={<>Life at the <span className="text-brand-gradient">Vidyapeeth</span></>}
              subtitle="Classrooms and laboratories, havan and festivals, sport and stage — a glimpse of every day here."
            />
            <Link
              href="/gallery"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              All {PHOTOS.length} photos <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <PhotoMosaic photos={HIGHLIGHTS.map(photo)} />
          </div>
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {ALBUMS.map((a) => (
              <Link
                key={a.slug}
                href={`/gallery#${a.slug}`}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/70 transition hover:border-saffron/50 hover:text-maroon"
              >
                {a.label}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* VISION */}
      <section className="bg-texture py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-5xl text-center">
            <Eyebrow>Vision & Mission</Eyebrow>
            <p className="font-hindi mt-6 text-2xl font-medium leading-[1.6] text-ink sm:text-4xl sm:leading-[1.55]">
              ज्ञान के साथ <span className="text-brand-gradient">विनय</span>, शिक्षा के साथ <span className="text-brand-gradient">संस्कार</span>, प्रतिभा के
              साथ <span className="text-brand-gradient">चरित्र</span> और सफलता के साथ <span className="text-brand-gradient">राष्ट्रसेवा</span>।
            </p>
            <p className="font-hindi mx-auto mt-4 max-w-3xl text-ink/55">{VISION.sankalp}</p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {VISION.pillars.map((p, i) => (
              <Reveal key={p} delay={i * 0.07} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
                <div className="spotlight group h-full rounded-3xl border border-ink/[0.07] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <p className="font-display text-sm font-semibold text-saffron">0{i + 1}</p>
                  <p className="font-hindi mt-8 text-3xl font-semibold text-ink transition group-hover:text-maroon">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/vision-mission" className="inline-flex items-center gap-2 font-bold text-ink hover:text-saffron">
              Our vision & mission <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* EMBLEM */}
      <section className="bg-maroon-texture relative overflow-hidden py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            light
            eyebrow={SITE.mottoSource}
            title={<span className="font-sanskrit font-normal">{SITE.motto}</span>}
            subtitle="हे अग्ने! आप तेजस्वरूप हैं, मुझे भी तेज प्रदान करें। — the four symbols of our emblem."
          />
          <div className="mt-14">
            <SymbolExplorer />
          </div>
        </div>
      </section>

      {/* CALENDAR SHOWCASE */}
      <section className="bg-texture py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionHeading
              align="left"
              eyebrow={`Annual academic calendar · ${SESSION.label}`}
              title="The whole year, at a glance"
              subtitle="Monthly schedules, examinations, holidays and co-curricular activities — every coloured day is an entry."
            />
            <Reveal className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {Object.keys(CATEGORIES).map((k) => (
                <CategoryBadge key={k} category={k} />
              ))}
            </Reveal>
          </div>
        </div>

        <div className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))]">
          {MONTHS.map((m) => {
            const evs = eventsForMonth(m.slug);
            return (
              <Link
                key={m.slug}
                href={`/calendar/${m.slug}`}
                className="spotlight group w-[17rem] shrink-0 snap-start rounded-3xl border border-ink/[0.07] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-ink">{m.name}</p>
                    <p className="text-xs font-semibold text-ink/40">{m.year}</p>
                  </div>
                  <span className="rounded-full bg-saffron/10 px-2.5 py-1 text-[11px] font-bold text-rust">{evs.length} dates</span>
                </div>
                <MiniMonth month={m} />
                <p className="mt-4 truncate border-t border-ink/[0.07] pt-3 text-xs text-ink/55">
                  <span className="font-bold text-ink">{evs[0].dateLabel}</span> · {evs[0].title}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* EXAMS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading align="left" eyebrow="Examination roadmap" title="Assessments through the year" />
            <Link
              href="/examinations"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              Exam details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-saffron via-gold to-maroon lg:block" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {exams.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.07}>
                  <div className="relative">
                    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-sm font-semibold text-white ring-4 ring-[#fffbf5]">
                      {i + 1}
                    </span>
                    <div className="spotlight mt-4 rounded-2xl border border-ink/[0.07] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-saffron">{shortRange(e)}</p>
                      <p className="mt-1 font-display font-semibold leading-snug text-ink">{e.title}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FESTIVALS — bento */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="left" eyebrow="Festivals & celebrations" title="A year rich with our traditions" />
          <div className="mt-12 grid auto-rows-[11rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {festivals.map((e, i) => {
              const Icon = FESTIVAL_ICONS[i];
              const big = i === 0;
              const dark = i === 1;
              return (
                <Reveal key={e.id} delay={(i % 4) * 0.07} className={big ? "sm:col-span-2 sm:row-span-2" : dark ? "sm:row-span-2" : i >= 4 ? "lg:col-span-2" : ""}>
                  <div
                    className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl ${
                      big ? "bg-gradient-to-br from-saffron via-rust to-maroon text-white" : dark ? "bg-ink text-white" : "border border-ink/[0.07] bg-white text-ink"
                    }`}
                  >
                    <Icon
                      className={`absolute -bottom-6 -right-6 transition duration-700 group-hover:rotate-12 group-hover:scale-110 ${
                        big ? "h-56 w-56 text-white/10" : dark ? "h-40 w-40 text-white/10" : "h-28 w-28 text-saffron/10"
                      }`}
                    />
                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${big || dark ? "bg-white/15" : "bg-saffron/10 text-saffron"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="relative">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${big || dark ? "text-white/70" : "text-ink/45"}`}>{formatLongDate(e)}</p>
                      <h3 className={`mt-1 font-display font-semibold tracking-tight ${big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{e.title}</h3>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUMMER CAMPS */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-[#eef2e6] p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>June 2027 · Summer vacation</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">Summer camps & workshops</h2>
            <p className="mt-3 text-ink/60">The Vidyapeeth is closed from 1 to 30 June 2027. Through the break, students can join these camps and workshops.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <CategoryBadge category="special" label="7 June · Maharana Pratap Jayanti" />
              <CategoryBadge category="special" label="21 June · International Yoga Day" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SUMMER_CAMPS.map((c, i) => {
              const Icon = CAMP_ICONS[c.icon];
              return (
                <Reveal key={c.title} delay={i * 0.07}>
                  <div className="flex h-full items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-leaf text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-display font-semibold leading-snug text-ink">{c.title}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="bg-maroon-texture relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="animate-blob absolute -left-10 -top-10 h-72 w-72 rounded-full bg-saffron/30 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Never miss a date <span className="text-gold-gradient">this session.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/60">Add all {STATS.events} entries to Google Calendar, Apple Calendar or Outlook in one tap.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <DownloadCalendarButton variant="primary" />
              <Link href="/calendar" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:bg-white/15">
                <CalendarDays className="h-4 w-4" /> Open full calendar
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
