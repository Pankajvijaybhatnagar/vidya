import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  BookOpen,
  Cctv,
  Cpu,
  Droplets,
  FlaskConical,
  Languages,
  Layers,
  Monitor,
  School,
  Trees,
  Trophy,
  Users,
} from "lucide-react";
import Reveal from "./Reveal";
import Photo from "./Photo";
import Portrait from "./Portrait";
import { ACHIEVEMENTS, FACILITIES, MESSAGES, PROGRAMMES } from "@/lib/content";
import { photo } from "@/lib/gallery";
import { MANAGEMENT } from "@/lib/site";

const ICONS = { school: School, layers: Layers, users: Users, languages: Languages, flask: FlaskConical, cpu: Cpu, monitor: Monitor, book: BookOpen, trophy: Trophy, trees: Trees, cctv: Cctv, droplets: Droplets, baby: Baby };

// Classes, streams, co-education and medium — a compact four-up strip.
export function ProgrammeStrip({ light = false }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {PROGRAMMES.map((p, i) => {
        const Icon = ICONS[p.icon];
        return (
          <Reveal key={p.en} delay={i * 0.06}>
            <div
              className={`flex h-full items-center gap-3 rounded-2xl p-4 sm:gap-4 sm:p-5 ${
                light ? "bg-white/[0.07] ring-1 ring-white/10" : "border border-ink/[0.07] bg-white shadow-sm"
              }`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-saffron to-rust text-white shadow-md">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className={`font-hindi block font-semibold leading-snug ${light ? "text-white" : "text-ink"}`}>{p.hi}</span>
                <span className={`block text-xs ${light ? "text-white/55" : "text-ink/50"}`}>{p.en}</span>
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function AchievementGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ACHIEVEMENTS.map((a, i) => (
        <Reveal key={a.en} delay={i * 0.07}>
          <div className="group relative h-full overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <span className="pointer-events-none absolute -right-4 -top-6 font-display text-8xl font-bold text-saffron/[0.07]">{i + 1}</span>
            <p className="font-hindi bg-gradient-to-br from-saffron to-maroon bg-clip-text text-5xl font-semibold tracking-tight text-transparent">{a.stat}</p>
            <p className="font-hindi mt-4 font-semibold leading-relaxed text-ink">{a.hi}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">{a.en}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// Facilities with a photo get an image tile; the rest an icon tile.
export function FacilityGrid() {
  const withPhoto = FACILITIES.filter((f) => f.photo);
  const iconOnly = FACILITIES.filter((f) => !f.photo);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {withPhoto.map((f, i) => {
          const p = photo(f.photo);
          return (
            <Reveal key={f.en} delay={i * 0.07}>
              <Link href={`/gallery#${p.album}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-sm ring-1 ring-ink/[0.06] transition hover:shadow-2xl">
                <Photo photo={p} alt={f.en} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-hindi block text-lg font-semibold text-white">{f.hi}</span>
                  <span className="block text-sm text-white/70">{f.en}</span>
                </span>
                <ArrowUpRight className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white/90 p-2 text-ink opacity-0 shadow transition group-hover:opacity-100" />
              </Link>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
        {iconOnly.map((f, i) => {
          const Icon = ICONS[f.icon];
          return (
            <Reveal key={f.en} delay={i * 0.05}>
              <div className="group flex h-full flex-col items-center rounded-[1.75rem] border border-ink/[0.07] bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-xl">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-saffron/10 text-saffron transition group-hover:bg-saffron group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="font-hindi mt-3 font-semibold leading-snug text-ink">{f.hi}</span>
                <span className="mt-0.5 text-xs text-ink/50">{f.en}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

export function ManagementList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MANAGEMENT.map((m, i) => {
        const msg = m.slug && MESSAGES.find((x) => x.slug === m.slug);
        const body = (
          <>
            {msg ? (
              <Portrait message={msg} size="sm" />
            ) : (
              <span className="font-hindi grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-maroon to-saffron text-xl font-semibold text-white shadow-lg">
                {m.nameHi.replace(/^(श्री|श्रीमती|डॉ\.)\s*/, "").charAt(0)}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="font-hindi block text-sm font-semibold text-saffron">{m.roleHi}</span>
              <span className="font-hindi block font-semibold leading-snug text-ink">{m.nameHi}</span>
              <span className="block text-xs text-ink/50">
                {m.name} · {m.role}
              </span>
            </span>
          </>
        );
        const cls = "flex h-full items-center gap-4 rounded-2xl border border-ink/[0.07] bg-white p-5 shadow-sm transition";
        return (
          <Reveal key={m.name} delay={(i % 3) * 0.07}>
            {msg ? (
              <Link href={`/messages/${m.slug}`} className={`${cls} group hover:-translate-y-0.5 hover:border-saffron/40 hover:shadow-xl`}>
                {body}
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/25 transition group-hover:text-saffron" />
              </Link>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
