import Image from "next/image";
import Photo from "./Photo";

const HINDI = /[ऀ-ॿ]/;

export default function PageHero({ eyebrow, title, subtitle, image, children }) {
  return (
    <section className="bg-maroon-texture relative overflow-hidden pb-24 pt-36 sm:pt-40">
      {image && (
        <>
          <Photo photo={image} alt="" sizes="100vw" preload className="opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep via-maroon-deep/85 to-maroon-deep/40" />
        </>
      )}
      <div className="animate-blob pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-saffron/30 blur-3xl" />
      <div className="animate-blob pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-maroon/70 blur-3xl [animation-delay:-6s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto]">
        <div className="max-w-4xl">
          {eyebrow && (
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron shadow-[0_0_12px] shadow-saffron" />
              <span className={HINDI.test(eyebrow) ? "font-hindi text-sm" : "text-xs font-semibold uppercase tracking-[0.2em]"}>{eyebrow}</span>
            </span>
          )}
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/65">{subtitle}</p>}
          {children}
        </div>
        <div className="relative hidden h-52 w-52 lg:block">
          <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-white/15" />
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-saffron/25 to-transparent blur-xl" />
          <div className="glass absolute inset-8 grid place-items-center rounded-full">
            <Image src="/kalash.png" alt="" width={110} height={110} className="animate-float drop-shadow-2xl" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#fffbf5]" />
    </section>
  );
}
