import Link from "next/link";
import { ArrowRight, Baby, BookHeart, Brush, Music, Palette, Smile, TreePine } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import Photo from "@/components/Photo";
import PhotoMosaic from "@/components/PhotoMosaic";
import { Shloka } from "@/components/MessageBody";
import { ABOUT, PLAQUE, messageBySlug } from "@/lib/content";
import { photo, photosIn } from "@/lib/gallery";

export const metadata = {
  title: "Balvatika",
  description: "Balvatika — the early-years wing of Vinay Bal Mandir Gurukul Vidyapeeth, housed in the Smt. Sulochana Devi building.",
};

// Learning approaches named in the Balvatika Coordinator's and Founder's messages.
const DAY = ["balvatika-05", "balvatika-44", "balvatika-15", "balvatika-30", "balvatika-13", "balvatika-49", "balvatika-37", "balvatika-02", "balvatika-10"];

const WAYS = [
  { icon: Smile, label: "खेल-खेल में सीखना", en: "Learning through play" },
  { icon: BookHeart, label: "कहानी-कथन", en: "Storytelling" },
  { icon: Music, label: "गीत-संगीत", en: "Songs & music" },
  { icon: Palette, label: "कला", en: "Art" },
  { icon: Brush, label: "रचनात्मक गतिविधियाँ", en: "Creative activities" },
  { icon: TreePine, label: "प्रकृति से प्रेम", en: "Love for nature" },
];

export default function BalvatikaPage() {
  const msg = messageBySlug("balvatika-coordinator");
  const quote = msg.blocks.find((b) => b.quote);

  return (
    <>
      <PageHero
        eyebrow="बाल वाटिका"
        title="Balvatika"
        subtitle="A loving, safe and creative beginning for our youngest learners."
        image={photo("balvatika-22")}
      />

      {/* Building */}
      <section className="bg-texture py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="श्रीमती सुलोचना देवी भवन" title="A home built for early childhood" />
            <Reveal delay={0.1}>
              <p className="font-hindi mt-6 text-justify text-[1.07rem] leading-[2] text-ink/90">{ABOUT.paragraphs[5]}</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Reveal className="col-span-2">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-xl ring-1 ring-ink/[0.06]">
                <Photo photo={photo("campus-11")} sizes="(min-width: 1024px) 36rem, 100vw" />
                <span className="font-hindi absolute bottom-3 left-3 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-ink shadow">
                  श्रीमती सुलोचना देवी स्मृति भवन
                </span>
              </div>
            </Reveal>
            {[
              ["12 जनवरी 2022", "शुभारम्भ", "Foundation"],
              ["24 मई 2024", "लोकार्पण", "Inauguration"],
            ].map(([d, t, en], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="rounded-3xl border border-ink/[0.07] bg-white p-6 text-center shadow-xl">
                  <Baby className="mx-auto h-10 w-10 text-saffron" />
                  <p className="font-hindi mt-3 text-2xl text-ink">{t}</p>
                  <p className="text-xs uppercase tracking-widest text-ink/50">{en}</p>
                  <p className="font-hindi mt-3 rounded-full bg-sand/70 py-1 font-semibold text-ink">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dedication plaque */}
      <section className="px-4 pt-20 sm:px-6">
        <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-maroon-texture shadow-2xl lg:grid-cols-[1fr_1.15fr]">
          <div className="relative min-h-[16rem]">
            <Photo photo={photo("campus-12")} sizes="(min-width: 1024px) 34rem, 100vw" />
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-gold-light">
              <span className="font-hindi text-sm">समर्पण पट्टिका</span>
              <span className="ml-2 text-xs font-bold uppercase tracking-[0.25em]">· Dedication</span>
            </p>
            <h2 className="font-hindi mt-3 text-3xl font-semibold text-white">{PLAQUE.title}</h2>
            <p className="font-sanskrit mt-2 text-xl text-marigold">{PLAQUE.dedication}</p>
            <p className="font-hindi mt-5 text-justify leading-[1.95] text-white/85">{PLAQUE.text}</p>
            <ul className="font-hindi mt-5 space-y-1.5 border-t border-white/10 pt-5 text-white/70">
              {PLAQUE.family.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* A day at Balvatika */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="एक दिन बाल वाटिका में"
              title="A day at Balvatika"
              subtitle="Hoops and races, morning drill, and attentive little faces in class — learning here begins with play."
            />
            <Link
              href="/gallery#balvatika"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              All {photosIn("balvatika").length} Balvatika photos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <PhotoMosaic photos={DAY.map(photo)} />
          </div>
        </div>
      </section>

      {/* Ways of learning */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="How children learn here" title="Joyful ways of learning" />
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">
            {WAYS.map((w, i) => (
              <Reveal key={w.en} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-3xl border border-ink/[0.07] bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-xl">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-saffron to-gold text-white shadow-lg transition group-hover:rotate-6">
                    <w.icon className="h-8 w-8" />
                  </span>
                  <p className="font-hindi mt-4 text-xl text-ink">{w.label}</p>
                  <p className="text-sm text-ink/60">{w.en}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coordinator */}
      <section className="bg-maroon-texture py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <Portrait message={msg} />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-light">{msg.role}</p>
              <h2 className="font-hindi mt-2 text-3xl text-white">{msg.name}</h2>
              <p className="mt-1 text-white/75">{msg.credentials}</p>
              <p className="font-hindi mt-5 leading-[2] text-white/90">{msg.blocks[0].p}</p>
              <Link href={`/messages/${msg.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-ink transition hover:bg-marigold">
                Read the full message <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Shloka light quote={quote.quote} />
        </div>
      </section>
    </>
  );
}
