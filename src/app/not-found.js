import Link from "next/link";
import Mandala from "@/components/Mandala";

export default function NotFound() {
  return (
    <section className="bg-maroon-texture relative grid min-h-[80vh] place-items-center overflow-hidden px-4 pt-32 text-center">
      <Mandala className="animate-spin-slow absolute h-[36rem] w-[36rem] text-gold/15" />
      <div className="relative">
        <p className="font-display text-8xl font-black text-marigold">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">This page could not be found</h1>
        <p className="font-hindi mt-2 text-white/80">क्षमा करें, यह पृष्ठ उपलब्ध नहीं है।</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-gold px-7 py-3 font-bold text-ink transition hover:bg-marigold">
          Back to home
        </Link>
      </div>
    </section>
  );
}
