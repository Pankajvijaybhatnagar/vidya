import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import Photo from "./Photo";

// Editorial photo grid: the first photo spans a 2×2 tile, the rest fill around it.
// Each tile links to its album in the gallery.
export default function PhotoMosaic({ photos, captions = true }) {
  return (
    <div className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 md:grid-cols-4">
      {photos.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 0.06} className={i === 0 ? "col-span-2 row-span-2" : ""}>
          <Link href={`/gallery#${p.album}`} className="group relative block h-full overflow-hidden rounded-3xl bg-sand/60 shadow-sm ring-1 ring-ink/[0.06]">
            <Photo
              photo={p}
              sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              className="transition duration-700 group-hover:scale-105"
            />
            {captions && (
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/75 via-ink/0 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                <span className={`font-semibold leading-snug text-white ${i === 0 ? "text-base" : "text-xs sm:text-sm"}`}>{p.alt}</span>
              </span>
            )}
            <ArrowUpRight className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 p-2 text-ink opacity-0 shadow transition group-hover:opacity-100" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
