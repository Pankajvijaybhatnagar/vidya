import Image from "next/image";
import { Flame, Flower2, Shell, Sun } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Mandala from "@/components/Mandala";
import { Shloka } from "@/components/MessageBody";
import { LOGO } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Our Logo",
  description: "The meaning of the Vinay Bal Mandir Gurukul Vidyapeeth emblem — तेजो मयि धेहि — and its four symbols: Sun, Conch, Lamp and Lotus.",
};

const ICONS = { surya: Sun, shankh: Shell, deepak: Flame, kamal: Flower2 };
// Where each symbol sits on the emblem image, in percent.
const HOTSPOTS = {
  surya: { left: "50%", top: "25%" },
  shankh: { left: "29%", top: "47%" },
  kamal: { left: "71%", top: "47%" },
  deepak: { left: "50%", top: "66%" },
};
const TINTS = {
  surya: "from-[#f59e0b] to-saffron",
  shankh: "from-rust to-maroon",
  deepak: "from-gold to-brown",
  kamal: "from-[#2F7F86] to-[#1d5458]",
};

export default function LogoPage() {
  return (
    <>
      <PageHero image={photo("havan-09")} eyebrow="Our Logo · ध्येय चिह्न" title={<span className="font-hindi">{LOGO.mantra}</span>} subtitle={SITE.mottoSource}>
        <p className="mt-2 italic text-white/80">“{SITE.mottoMeaning}”</p>
      </PageHero>

      {/* Mantra */}
      <section className="bg-texture py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <p className="font-hindi text-center text-lg leading-loose text-ink/90">{LOGO.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto my-10 w-fit">
              <Mandala className="animate-spin-slow absolute -inset-10 text-gold/25" />
              <p className="font-sanskrit ring-gradient relative rounded-full bg-ink px-10 py-6 text-4xl text-gold-light shadow-2xl sm:text-5xl">
                {LOGO.mantra}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-lg">
                <p className="font-hindi text-lg font-semibold text-saffron">अर्थ</p>
                <p className="font-hindi mt-3 text-lg leading-loose text-ink">{LOGO.meaning}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="h-full rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-lg">
                <p className="font-hindi text-lg font-semibold text-saffron">समग्र भावार्थ</p>
                <p className="font-hindi mt-3 text-lg leading-loose text-ink">{LOGO.bhavarth}</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="font-hindi mt-10 text-justify text-[1.07rem] leading-[2] text-ink/90">
              {LOGO.reflection}
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 rounded-[2rem] bg-maroon-texture p-8 text-center shadow-2xl sm:p-10">
              {LOGO.verses.map((v) => (
                <p key={v} className="font-hindi text-2xl leading-relaxed text-marigold sm:text-3xl">
                  “{v}”
                </p>
              ))}
              <p className="font-hindi mx-auto mt-6 max-w-2xl text-lg text-white/90">{LOGO.resolve}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Emblem map */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="ध्येय चिह्न" title={<span className="font-hindi">{LOGO.symbolsIntro}</span>} subtitle="Tap a symbol on the emblem to read its meaning." />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="relative mx-auto w-full max-w-md">
              <Image src="/logo.png" alt={`${SITE.name} emblem`} width={443} height={443} className="w-full drop-shadow-2xl" />
              {LOGO.symbols.map((s) => (
                <a
                  key={s.key}
                  href={`#${s.key}`}
                  aria-label={s.name}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={HOTSPOTS[s.key]}
                >
                  <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-marigold/70" />
                  <span className="relative block h-5 w-5 rounded-full border-2 border-white bg-saffron shadow-lg" />
                  <span className="font-hindi pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-sm text-marigold opacity-0 shadow-lg transition group-hover:opacity-100">
                    {s.name}
                  </span>
                </a>
              ))}
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {LOGO.symbols.map((s, i) => {
                const Icon = ICONS[s.key];
                return (
                  <Reveal key={s.key} delay={i * 0.08}>
                    <a
                      href={`#${s.key}`}
                      className={`group block h-full rounded-3xl bg-gradient-to-br ${TINTS[s.key]} p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}
                    >
                      <Icon className="h-9 w-9 text-marigold transition group-hover:scale-110" />
                      <p className="font-hindi mt-4 text-3xl">{s.name}</p>
                      <p className="text-sm text-white/80">{s.en}</p>
                      <p className="font-hindi mt-3 text-sm text-marigold">{s.essence}</p>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Symbol details */}
      {LOGO.symbols.map((s, i) => {
        const Icon = ICONS[s.key];
        const dark = i % 2 === 1;
        return (
          <section key={s.key} id={s.key} className={`scroll-mt-28 py-20 ${dark ? "bg-maroon-texture" : "bg-texture"}`}>
            <div className={`mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 ${dark ? "md:grid-cols-[1fr_220px]" : "md:grid-cols-[220px_1fr]"}`}>
              <Reveal className={`text-center ${dark ? "md:order-2" : ""}`}>
                <div className="relative mx-auto grid h-48 w-48 place-items-center">
                  <Mandala className={`animate-spin-slow absolute inset-0 ${dark ? "text-gold/50" : "text-gold"}`} />
                  <span className={`relative grid h-28 w-28 rotate-45 place-items-center rounded-3xl bg-gradient-to-br ${TINTS[s.key]} shadow-2xl ring-4 ring-saffron/40`}>
                    <Icon className="h-12 w-12 -rotate-45 text-marigold" />
                  </span>
                </div>
                <p className={`font-hindi mt-4 text-4xl ${dark ? "text-marigold" : "text-ink"}`}>{s.name}</p>
                <p className={`text-sm ${dark ? "text-white/70" : "text-ink/60"}`}>{s.en}</p>
              </Reveal>
              <Reveal delay={0.1} className={dark ? "md:order-1" : ""}>
                <div className={`font-hindi space-y-5 text-justify text-[1.07rem] leading-[2] ${dark ? "text-white/90" : "text-ink/90"}`}>
                  {s.paragraphs.map((p, j) =>
                    j === s.paragraphs.length - 1 && s.paragraphs.length > 1 ? (
                      <p key={j} className={`rounded-2xl border-l-0 p-5 ${dark ? "bg-white/10 text-white" : "bg-white text-ink shadow-md"}`}>
                        {p}
                      </p>
                    ) : (
                      <p key={j}>{p}</p>
                    )
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Shloka quote={LOGO.mantra} gloss={LOGO.meaning} />
        </div>
      </section>
    </>
  );
}
