"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { ALBUMS, PHOTOS } from "@/lib/gallery";

const ALL = "all";

// "All photos" deals albums round-robin so the grid opens with variety rather than one album's burst shots.
const MIXED = (() => {
  const queues = ALBUMS.map((a) => PHOTOS.filter((p) => p.album === a.slug));
  const out = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift());
  return out;
})();

export default function GalleryBrowser() {
  const [album, setAlbum] = useState(ALL);
  const [open, setOpen] = useState(null); // index into `shown`
  const top = useRef(null);

  // Albums are linked as /gallery#<slug> from the rest of the site.
  useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.slice(1);
      const known = ALBUMS.some((a) => a.slug === slug);
      setAlbum(known ? slug : ALL);
      if (known) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const shown = useMemo(() => (album === ALL ? MIXED : PHOTOS.filter((p) => p.album === album)), [album]);
  const counts = useMemo(() => Object.fromEntries(ALBUMS.map((a) => [a.slug, PHOTOS.filter((p) => p.album === a.slug).length])), []);

  const pick = (slug) => {
    setAlbum(slug);
    history.replaceState(null, "", slug === ALL ? window.location.pathname : `#${slug}`);
  };

  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open === null ? null : shown[open];
  const albumOf = (slug) => ALBUMS.find((a) => a.slug === slug);

  return (
    <>
      {/* Album tabs */}
      <div ref={top} className="scroll-mt-28" />
      <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {[{ slug: ALL, label: "All photos", labelHi: "सभी" }, ...ALBUMS].map((a) => {
          const active = album === a.slug;
          return (
            <button
              key={a.slug}
              type="button"
              onClick={() => pick(a.slug)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                active ? "bg-ink text-white shadow-lg" : "border border-ink/10 bg-white text-ink/70 hover:border-saffron/50 hover:text-ink"
              }`}
            >
              {a.label}
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${active ? "bg-saffron text-white" : "bg-ink/[0.06] text-ink/50"}`}>
                {a.slug === ALL ? PHOTOS.length : counts[a.slug]}
              </span>
            </button>
          );
        })}
      </div>

      {album !== ALL && <p className="font-hindi mt-6 text-center text-lg text-rust">{albumOf(album).labelHi}</p>}

      {/* Masonry */}
      <div className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4">
        {shown.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-sand/60 shadow-sm ring-1 ring-ink/[0.06] transition hover:shadow-xl sm:mb-4"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              placeholder="blur"
              blurDataURL={p.blur}
              className="h-auto w-full transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/0 to-transparent p-3 text-left opacity-0 transition group-hover:opacity-100">
              <span className="text-sm font-semibold leading-snug text-white">{p.alt}</span>
            </span>
            <Expand className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/85 p-2 text-ink opacity-0 shadow transition group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={() => setOpen(null)}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
              <p className="text-sm text-white/60">
                <span className="font-bold text-white">{open + 1}</span> / {shown.length} · {albumOf(current.album).label}
              </p>
              <button type="button" onClick={() => setOpen(null)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <motion.div key={current.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} className="absolute inset-2 sm:inset-6">
                <Image src={current.src} alt={current.alt} fill sizes="100vw" placeholder="blur" blurDataURL={current.blur} className="object-contain" />
              </motion.div>
              {shown.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-saffron sm:left-6"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-saffron sm:right-6"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <p className="px-4 py-4 text-center font-semibold text-white sm:px-6" onClick={(e) => e.stopPropagation()}>
              {current.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
