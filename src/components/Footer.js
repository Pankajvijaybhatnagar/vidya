import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { NAV, SITE, telHref } from "@/lib/site";
import { MONTHS, SESSION } from "@/lib/calendar";

const LINKS = NAV.flatMap((n) => n.children || [n]);

export default function Footer() {
  return (
    <footer className="bg-maroon-texture relative mt-auto overflow-hidden text-white">
      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        {/* Big call-out row */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <div>
            <p className="font-hindi text-lg text-gold-light">{SITE.taglineHi}</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Where modern learning meets <span className="text-gold-gradient">sanskar.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="btn-primary group inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-4 font-bold text-white transition hover:brightness-110"
          >
            Get in touch <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt={`${SITE.name} logo`} width={56} height={56} className="rounded-full bg-white p-0.5" />
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-saffron">Vinay Bal Mandir</p>
                <p className="font-display text-xl font-semibold">Gurukul Vidyapeeth</p>
                <p className="font-hindi text-sm text-white/60">{SITE.nameHi}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {SITE.tagline}. Founded {SITE.founded}; run by {SITE.operator}.
            </p>
            <p className="font-sanskrit mt-5 inline-block rounded-full bg-white/5 px-4 py-1.5 text-gold-light ring-1 ring-white/10">
              “{SITE.motto}”
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {LINKS.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/70 transition hover:text-saffron">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Session {SESSION.short}</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {MONTHS.map((m) => (
                <li key={m.slug}>
                  <Link href={`/calendar/${m.slug}`} className="text-white/70 transition hover:text-saffron">
                    {m.name.slice(0, 3)} {m.year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Reach us</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-saffron" />
                <span>
                  {SITE.address}
                  <span className="font-hindi mt-0.5 block text-white/45">{SITE.addressHi}</span>
                </span>
              </li>
              {SITE.phones.length > 0 && (
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-saffron" />
                  <span className="flex flex-col gap-1">
                    {SITE.phones.map((n) => (
                      <a key={n} href={telHref(n)} className="hover:text-saffron">
                        +91 {n}
                      </a>
                    ))}
                  </span>
                </li>
              )}
              {SITE.email && (
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-saffron" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-saffron">{SITE.email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none relative mx-auto max-w-7xl select-none overflow-hidden px-4 sm:px-6" aria-hidden="true">
        <p className="translate-y-[18%] whitespace-nowrap font-display text-[17vw] font-bold leading-none tracking-tighter text-white/[0.04] lg:text-[13rem]">
          Vidyapeeth
        </p>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-6">
          <p>© {SITE.name}, {SITE.city}. All rights reserved.</p>
          <p>Annual Academic Calendar · Session {SESSION.label}</p>
        </div>
      </div>
    </footer>
  );
}
