"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Award, CalendarDays, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { NAV, SITE, telHref } from "@/lib/site";

function isActive(pathname, item) {
  if (!pathname) return false;
  if (item.href === "/") return pathname === "/";
  const hrefs = item.children ? item.children.map((c) => c.href) : [item.href];
  return hrefs.some((h) => pathname === h || pathname.startsWith(h + "/"));
}

function DesktopItem({ item, active }) {
  const [open, setOpen] = useState(false);
  const cls = `relative flex h-full items-center gap-1 px-3.5 text-[14px] font-semibold transition ${
    active ? "text-maroon" : "text-ink/70 hover:text-maroon"
  }`;
  const pill = active && (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-x-3.5 bottom-0 h-[3px] rounded-t-full bg-saffron"
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
    />
  );

  if (!item.children) {
    return (
      <Link href={item.href} className={cls}>
        {item.label}
        {pill}
      </Link>
    );
  }

  return (
    <div className="relative h-full" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className={cls} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
        {pill}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2"
          >
            <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white p-2 shadow-2xl">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-saffron/10"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-saffron">{c.label}</span>
                    <span className="font-hindi block text-xs text-ink/50">{c.hint}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-saffron" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileItem({ item, active, onNavigate, index }) {
  const [open, setOpen] = useState(active);
  const base = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05 * index } };
  if (!item.children) {
    return (
      <motion.div {...base}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`block py-2 font-display text-3xl font-semibold tracking-tight ${active ? "text-saffron" : "text-white"}`}
        >
          {item.label}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.div {...base}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between py-2 font-display text-3xl font-semibold tracking-tight ${
          active ? "text-saffron" : "text-white"
        }`}
      >
        {item.label}
        <ChevronDown className={`h-6 w-6 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="grid gap-1 pb-3 pl-1">
              {item.children.map((c) => (
                <Link key={c.href} href={c.href} onClick={onNavigate} className="flex items-baseline gap-2 py-1.5 text-white/70 hover:text-white">
                  {c.label}
                  <span className="font-hindi text-xs text-white/40">{c.hint}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NavLinks({ mobile, onNavigate, pathname }) {
  return NAV.map((item, i) =>
    mobile ? (
      <MobileItem key={item.label} index={i} item={item} active={isActive(pathname, item)} onNavigate={onNavigate} />
    ) : (
      <DesktopItem key={item.label} item={item} active={isActive(pathname, item)} />
    )
  );
}

function LiveNavLinks(props) {
  const pathname = usePathname();
  return <NavLinks {...props} pathname={pathname} />;
}

// Wraps the pathname read so the shell can prerender; the fallback has no active state.
function Links(props) {
  return (
    <Suspense fallback={<NavLinks {...props} pathname={null} />}>
      <LiveNavLinks {...props} />
    </Suspense>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip — collapses once the page scrolls */}
      <div
        className={`hidden overflow-hidden bg-maroon-deep text-white/75 transition-all duration-300 lg:block ${
          scrolled ? "max-h-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-6 px-6 text-xs">
          <p className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-saffron" /> {SITE.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-saffron" /> Affiliated to BSEH, Bhiwani
            </span>
            <a href={telHref(SITE.phones[0])} className="flex items-center gap-1.5 transition hover:text-white">
              <Phone className="h-3.5 w-3.5 text-saffron" /> {SITE.phones.join(", ")}
            </a>
          </p>
          <p className="font-hindi tracking-wide text-gold-light">{SITE.motto} · {SITE.mottoMeaning}</p>
        </div>
      </div>

      <div
        className={`border-b bg-cream/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "border-ink/10 shadow-lg" : "border-ink/[0.06]"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px]">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-saffron/60 lg:h-12 lg:w-12">
              <Image src="/logo.png" alt={`${SITE.name} logo`} width={48} height={48} className="rounded-full" preload />
            </span>
            <span className="min-w-0 border-l border-ink/10 pl-3 leading-none">
              <span className="block truncate text-[10px] font-bold uppercase tracking-[0.26em] text-rust">Vinay Bal Mandir</span>
              <span className="mt-1 block truncate font-display text-lg font-semibold tracking-tight text-maroon lg:text-xl">
                Gurukul Vidyapeeth
              </span>
            </span>
          </Link>

          <nav className="relative isolate hidden h-full items-stretch xl:flex" aria-label="Main">
            <Links />
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/calendar"
              className="hidden items-center gap-1.5 rounded-lg bg-maroon px-4 py-2.5 text-[13px] font-bold text-white shadow-md transition hover:bg-saffron md:inline-flex"
            >
              <CalendarDays className="h-4 w-4" />
              Calendar 2027–28
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-lg bg-maroon text-white shadow-md xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-maroon-texture fixed inset-0 z-50 flex flex-col overflow-y-auto px-6 pb-10 pt-6 xl:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Image src="/logo.png" alt="" width={44} height={44} className="rounded-full bg-white p-0.5" />
                <span className="font-display text-lg font-semibold text-white">Gurukul Vidyapeeth</span>
              </span>
              <button onClick={close} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col divide-y divide-white/10" aria-label="Mobile">
              <Links mobile onNavigate={close} />
            </nav>
            <div className="mt-auto pt-10">
              <Link href="/calendar" onClick={close} className="btn-primary flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white">
                Academic Calendar 2027–28 <ArrowUpRight className="h-4 w-4" />
              </Link>
              <p className="font-hindi mt-6 text-center text-white/60">{SITE.taglineHi}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
