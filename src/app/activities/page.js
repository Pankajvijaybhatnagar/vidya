import Link from "next/link";
import { ArrowUpRight, Flag, Music, Sparkles, Star, Trophy, Waves } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import EventRow from "@/components/EventRow";
import Photo from "@/components/Photo";
import { ALBUMS, photo, photosIn } from "@/lib/gallery";
import { CATEGORIES, EVENTS, SUMMER_CAMPS, eventsByCategory, formatLongDate } from "@/lib/calendar";

export const metadata = {
  title: "Co-Curricular Activities",
  description: "Celebrations, special assemblies, national events and summer camps at Gurukul Vidyapeeth, session 2027–28.",
};

const CAMP_ICONS = { music: Music, sparkles: Sparkles, waves: Waves };

// Photo stories from past sessions: album, lead photo, two supporting photos, one-line description.
const STORIES = [
  { album: "annual", photos: ["annual-08", "annual-19", "annual-26"], text: "Folk dances, yoga displays, songs and prize-giving before parents and honoured guests." },
  { album: "havan", photos: ["havan-09", "havan-01", "havan-07"], text: "Havan and Sattra Shubharambh ceremonies that begin every new chapter with sanskar." },
  { album: "culture", photos: ["culture-02", "culture-15", "culture-09"], text: "Haryanvi heritage, Janmashtami, Teej, mehndi, rangoli and fancy dress." },
  { album: "sports", photos: ["sports-12", "sports-07", "sports-14"], text: "March-past, track events and team games at the annual sports meet." },
];

export default function ActivitiesPage() {
  const national = eventsByCategory("national");
  const cocurricular = eventsByCategory("cocurricular").sort((a, b) => a.start.localeCompare(b.start));
  const special = eventsByCategory("special").sort((a, b) => a.start.localeCompare(b.start));
  const meet = EVENTS.find((e) => e.title === "Inter-House Cultural & Sports Meet");
  const annual = EVENTS.find((e) => e.title === "Vidyapeeth Annual Function");

  return (
    <>
      <PageHero
        eyebrow="Beyond the classroom"
        title="Co-Curricular Activities"
        subtitle="Jayantis, festivals, special assemblies, national celebrations and summer camps that shape character alongside academics."
        image={photo("annual-07")}
      />

      {/* Signature events */}
      <section className="bg-texture py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Signature events" title="Highlights of the year" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              [meet, Trophy, "from-leaf to-[#3a4d22]"],
              [annual, Star, "from-maroon to-maroon-deep"],
              ...national.map((n) => [n, Flag, "from-[#1E3A8A] to-[#132560]"]),
            ].map(([e, Icon, grad], i) => (
              <Reveal key={e.id} delay={(i % 2) * 0.1}>
                <div className={`group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-8 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}>
                  <Icon className="absolute -bottom-6 -right-6 h-40 w-40 text-white/10 transition duration-700 group-hover:scale-110" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-marigold">{e.tag}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{e.title}</h3>
                  <p className="mt-2 text-white/85">{formatLongDate(e)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo stories */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="From past sessions" title="Moments from our celebrations" />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {STORIES.map((st, i) => {
              const album = ALBUMS.find((a) => a.slug === st.album);
              const [lead, ...rest] = st.photos.map(photo);
              return (
                <Reveal key={st.album} delay={(i % 2) * 0.1}>
                  <Link
                    href={`/gallery#${st.album}`}
                    className="group grid h-full grid-cols-3 grid-rows-[11rem_7rem] gap-2 overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl sm:grid-rows-[14rem_8rem]"
                  >
                    <div className="relative col-span-3 overflow-hidden rounded-[1.5rem]">
                      <Photo photo={lead} sizes="(min-width: 1024px) 40vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-hindi text-sm text-gold-light">{album.labelHi}</p>
                        <p className="font-display text-2xl font-semibold tracking-tight text-white">{album.label}</p>
                      </div>
                    </div>
                    {rest.map((p) => (
                      <div key={p.id} className="relative overflow-hidden rounded-[1.25rem]">
                        <Photo photo={p} sizes="(min-width: 1024px) 14vw, 33vw" />
                      </div>
                    ))}
                    <div className="flex flex-col justify-between rounded-[1.25rem] bg-cream p-3 sm:p-4">
                      <p className="line-clamp-3 text-xs leading-snug text-ink/65 sm:text-sm">{st.text}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-saffron sm:text-sm">
                        {photosIn(st.album).length} photos <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two columns of events */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="flex items-center gap-3 font-display text-3xl font-semibold tracking-tight text-ink">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: CATEGORIES.cocurricular.color }} />
                Co-Curricular Celebrations
              </h2>
              <p className="mt-2 text-ink/70">{cocurricular.length} jayantis and festivals celebrated at the Vidyapeeth.</p>
            </Reveal>
            <div className="mt-6 space-y-3">
              {cocurricular.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.04} y={16}>
                  <EventRow event={e} />
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <h2 className="flex items-center gap-3 font-display text-3xl font-semibold tracking-tight text-ink">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: CATEGORIES.special.color }} />
                Special Assemblies & Observances
              </h2>
              <p className="mt-2 text-ink/70">{special.length} special events, observances and student-led days.</p>
            </Reveal>
            <div className="mt-6 space-y-3">
              {special.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.04} y={16}>
                  <EventRow event={e} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Camps */}
      <section className="bg-maroon-texture py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            light
            eyebrow="June 2027"
            title="Summer Camps & Workshops"
            subtitle="Held during the summer vacation, 1 – 30 June 2027."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUMMER_CAMPS.map((c, i) => {
              const Icon = CAMP_ICONS[c.icon];
              return (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="group h-full rounded-3xl border border-ink/[0.07] bg-white p-6 text-center shadow-xl transition hover:-translate-y-2">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-saffron text-white shadow-lg transition group-hover:rotate-12 group-hover:bg-leaf">
                      <Icon className="h-8 w-8" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{c.title}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
