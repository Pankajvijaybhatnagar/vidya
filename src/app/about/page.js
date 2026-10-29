import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Building2, Landmark, ScrollText } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Mandala from "@/components/Mandala";
import { ABOUT, MILESTONES, TEACHERS_LINE } from "@/lib/content";
import { SITE } from "@/lib/site";
import { photo } from "@/lib/gallery";
import Photo from "@/components/Photo";
import PhotoMosaic from "@/components/PhotoMosaic";
import { AchievementGrid, FacilityGrid, ManagementList, ProgrammeStrip } from "@/components/SchoolFacts";

export const metadata = {
  title: "About Vidyapeeth",
  description: `${SITE.name}, ${SITE.address} — founded ${SITE.founded}. ${SITE.affiliation}`,
};

const CAMPUS = ["campus-07", "campus-09", "campus-13", "campus-06", "campus-15", "campus-16", "campus-17", "lab-03", "classrooms-08"];

const FACTS = [
  { icon: Landmark, label: "स्थापना", value: "24 मई 2012, गुरुवार" },
  { icon: ScrollText, label: "संचालन", value: "डी.डी.एम. न्यास" },
  { icon: Award, label: "मान्यता", value: "हरियाणा विद्यालय शिक्षा बोर्ड, भिवानी" },
  { icon: Building2, label: "परिसर", value: "सफीदों रोड, लखमीरवाला, जीन्द" },
];

export default function AboutPage() {
  const [p1, p2, p3, p4, p5, p6, ...rest] = ABOUT.paragraphs;

  return (
    <>
      <PageHero eyebrow="About Vidyapeeth" title={<span className="font-hindi">{SITE.nameHi}</span>} subtitle={SITE.tagline} image={photo("campus-09")}>
        <p className="font-hindi mt-3 text-xl text-white/90">{SITE.taglineHi}</p>
      </PageHero>

      {/* Quick facts */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-ink/[0.07] bg-white p-5 shadow-xl">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-saffron text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="font-hindi block text-sm text-saffron">{f.label}</span>
                  <span className="font-hindi block font-semibold leading-snug text-ink">{f.value}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Foundation story */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="relative mx-auto w-full max-w-[380px] px-8 sm:px-0 lg:sticky lg:top-32 lg:self-start">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-saffron/30 to-gold/30 blur-3xl" />
            <Mandala className="animate-spin-slow absolute -inset-12 text-gold/40" petals={24} />
            <Image src="/logo.png" alt={`${SITE.name} emblem`} width={380} height={380} className="relative h-auto w-full max-w-[380px] rounded-full shadow-2xl" />
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="Our story" title={<span className="font-hindi">{ABOUT.heading}</span>} />
            <div className="font-hindi mt-8 space-y-6 text-justify text-[1.07rem] leading-[2] text-ink/90">
              <Reveal>
                <p className="">{p1}</p>
              </Reveal>
              <Reveal>
                <p>{p2}</p>
              </Reveal>
              <Reveal>
                <p>{p3}</p>
              </Reveal>
              <Reveal>
                <p className="rounded-2xl border-2 border-leaf/40 bg-leaf/5 p-5 font-semibold text-leaf">
                  <Award className="mb-1 mr-2 inline h-5 w-5" />
                  {p4}
                </p>
              </Reveal>
              <Reveal>
                <p>{p5}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes & achievements */}
      <section className="bg-texture py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="शिक्षा एवं उपलब्धियाँ" title="Programmes & achievements" subtitle={TEACHERS_LINE.en} />
          <p className="font-hindi mt-3 text-center text-lg text-rust">{TEACHERS_LINE.hi}</p>
          <div className="mt-12">
            <ProgrammeStrip />
          </div>
          <div className="mt-4">
            <AchievementGrid />
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="सुविधाएँ" title="Facilities for all-round development" subtitle="छात्र-छात्राओं के सर्वांगीण विकास हेतु आधुनिक सुविधाएँ" />
          <div className="mt-12">
            <FacilityGrid />
          </div>
        </div>
      </section>

      {/* Campus */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="परिसर"
              title="Our campus"
              subtitle="Open grounds and green lawns, bright classrooms, a science laboratory and walls that carry the stories of our heritage."
            />
            <Link
              href="/gallery#campus"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              Campus album <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <PhotoMosaic photos={CAMPUS.map(photo)} />
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="bg-texture py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="प्रबन्धन" title="Management" subtitle={`The Vidyapeeth is run by ${SITE.operator} (${SITE.operatorHi}).`} />
          <div className="mt-12">
            <ManagementList />
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-maroon-texture relative overflow-hidden py-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading light eyebrow="यात्रा" title="Milestones" />
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-ink/[0.07] bg-white p-6 shadow-2xl transition hover:-translate-y-2">
                  <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full border-4 border-maroon bg-marigold font-display font-semibold text-ink">
                    {i + 1}
                  </span>
                  <p className="font-hindi mt-3 text-sm font-semibold text-saffron">{m.date}</p>
                  <h3 className="font-hindi mt-1 text-xl leading-snug text-ink">{m.title}</h3>
                  <p className="font-hindi mt-2 text-sm leading-relaxed text-ink/80">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Balvatika + values */}
      <section className="bg-texture py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white shadow-xl">
              <div className="grid sm:grid-cols-2">
                <div className="relative aspect-[3/2]">
                  <Photo photo={photo("campus-11")} sizes="(min-width: 640px) 32rem, 100vw" />
                </div>
                <div className="relative aspect-[3/2]">
                  <Photo photo={photo("campus-12")} sizes="(min-width: 640px) 32rem, 100vw" />
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <p className="font-hindi text-lg font-semibold text-saffron">✦ बालवाटिका भवन ✦</p>
                <p className="font-hindi mt-4 text-justify text-[1.07rem] leading-[2] text-ink/90">{p6}</p>
                <Link href="/balvatika" className="mt-5 inline-flex items-center gap-2 font-bold text-saffron hover:text-ink">
                  Explore Balvatika <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="font-hindi mt-10 space-y-6 text-justify text-[1.07rem] leading-[2] text-ink/90">
            {rest.map((p, i) => (
              <Reveal key={i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-4 sm:px-6">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-maroon-texture px-6 py-14 text-center shadow-2xl sm:px-14">
          <Mandala className="animate-spin-slow absolute -left-16 -top-16 h-64 w-64 text-gold/20" />
          <p className="font-hindi relative text-2xl leading-relaxed text-marigold sm:text-3xl">{ABOUT.closing}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/our-logo" className="rounded-full bg-gold px-6 py-3 font-bold text-ink transition hover:bg-marigold">
              Our Logo
            </Link>
            <Link href="/vision-mission" className="rounded-full border-2 border-cream/60 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink">
              Vision & Mission
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
