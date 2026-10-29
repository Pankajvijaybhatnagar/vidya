import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import GalleryBrowser from "@/components/GalleryBrowser";
import { ALBUMS, PHOTOS, photo, photosIn } from "@/lib/gallery";

export const metadata = {
  title: "Photo Gallery",
  description: "Campus, classrooms, Balvatika, science laboratory, annual functions, havan, festivals and sports at Vinay Bal Mandir Gurukul Vidyapeeth, Jind.",
};

// Cover photo for each album card.
const COVERS = {
  campus: "campus-07",
  classrooms: "classrooms-11",
  lab: "lab-03",
  balvatika: "balvatika-05",
  annual: "annual-08",
  havan: "havan-09",
  culture: "culture-02",
  sports: "sports-12",
  events: "events-01",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="छायाचित्र दीर्घा"
        title="Photo Gallery"
        subtitle={`${PHOTOS.length} moments from the Vidyapeeth — our campus, classrooms, celebrations, sanskar and sport.`}
        image={photo("annual-07")}
      />

      {/* Albums */}
      <section className="bg-texture py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Albums" title="Browse by album" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {ALBUMS.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.07}>
                <a href={`#${a.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl shadow-sm ring-1 ring-ink/[0.06] transition hover:shadow-2xl">
                  <Photo photo={photo(COVERS[a.slug])} sizes="(min-width: 768px) 33vw, 50vw" className="transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-6">
                    <span>
                      <span className="font-hindi block text-sm text-gold-light">{a.labelHi}</span>
                      <span className="block font-display text-lg font-semibold leading-tight text-white sm:text-2xl">{a.label}</span>
                      <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-white/60">{photosIn(a.slug).length} photos</span>
                    </span>
                    <ArrowUpRight className="hidden h-10 w-10 shrink-0 rounded-full bg-white/15 p-2.5 text-white transition group-hover:bg-saffron sm:block" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Every photo */}
      <section className="scroll-mt-24 py-20" id="photos">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="All moments" title="Life at the Vidyapeeth" subtitle="Tap any photo to view it full-size; use the arrow keys to move between photos." />
          <div className="mt-10">
            <GalleryBrowser />
          </div>
          <Reveal className="mt-14 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white transition hover:bg-saffron">
              Visit the campus <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
