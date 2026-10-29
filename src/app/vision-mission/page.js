import { BookOpen, Crown, Feather, HandHeart, Mountain } from "lucide-react";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import Mandala from "@/components/Mandala";
import { VISION } from "@/lib/content";

export const metadata = {
  title: "Vision & Mission",
  description: "विद्यापीठ : उद्देश्य एवं संकल्प — the vision and mission of Vinay Bal Mandir Gurukul Vidyapeeth.",
};

const PILLAR_ICONS = [BookOpen, Feather, HandHeart, Crown, Mountain];

export default function VisionPage() {
  return (
    <>
      <PageHero image={photo("classrooms-13")} eyebrow="Vision & Mission" title={<span className="font-hindi">{VISION.heading}</span>} />

      {/* Vision statement */}
      <section className="bg-texture py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/[0.07] bg-white p-8 shadow-2xl sm:p-12">
              <Mandala className="absolute -right-24 -top-24 h-72 w-72 text-gold/20" />
              <p className="relative font-semibold text-saffron">✦ Our Vision · <span className="font-hindi">उद्देश्य</span> ✦</p>
              <p className="font-hindi relative mt-5 text-xl leading-[2] text-ink sm:text-2xl">{VISION.vision}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {VISION.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={p} delay={i * 0.08} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
                  <div className="group rounded-3xl bg-gradient-to-b from-saffron to-rust p-5 text-center text-white shadow-xl transition hover:-translate-y-2">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/20 ring-2 ring-marigold transition group-hover:rotate-12">
                      <Icon className="h-7 w-7 text-marigold" />
                    </span>
                    <p className="font-hindi mt-3 text-2xl">{p}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission — numbered resolutions */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="font-semibold text-saffron">✦ Our Mission · <span className="font-hindi">संकल्प</span> ✦</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Our resolve</h2>
          </Reveal>
          <ol className="relative mt-14 space-y-8 border-l border-ink/10 pl-8 sm:pl-12">
            {VISION.paragraphs.map((p, i) => (
              <Reveal as="li" key={i} delay={0.05} className="relative">
                <span className="absolute -left-[3.05rem] top-0 grid h-10 w-10 place-items-center rounded-full border-4 border-[#fffaf0] bg-ink font-display font-semibold text-marigold shadow-lg sm:-left-[4.05rem]">
                  {i + 1}
                </span>
                <p className="font-hindi rounded-3xl border border-ink/[0.07] bg-white p-6 text-justify text-[1.05rem] leading-[2] text-ink/90 shadow-md transition hover:border-saffron/40/40 hover:shadow-xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Sankalp */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-maroon-texture px-6 py-14 text-center shadow-2xl sm:px-14">
          <Mandala className="animate-spin-slow absolute -left-16 -top-16 h-64 w-64 text-gold/20" />
          <Mandala className="animate-spin-slow absolute -bottom-20 -right-16 h-72 w-72 text-gold/20" />
          <p className="font-hindi relative text-2xl leading-relaxed text-marigold sm:text-3xl">{VISION.sankalp}</p>
          <div className="relative mx-auto my-8 h-px w-40 bg-gold/60" />
          <p className="font-hindi relative text-xl text-white">{VISION.closing}</p>
        </Reveal>
      </section>
    </>
  );
}
