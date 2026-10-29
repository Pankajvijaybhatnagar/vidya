"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Flame, Flower2, Shell, Sun } from "lucide-react";
import { LOGO } from "@/lib/content";

const ICONS = { surya: Sun, shankh: Shell, deepak: Flame, kamal: Flower2 };

// Tabs over the four emblem symbols, showing each one's essence and opening paragraph.
export default function SymbolExplorer() {
  const [active, setActive] = useState(0);
  const s = LOGO.symbols[active];
  const Icon = ICONS[s.key];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute inset-[10%] rounded-full bg-saffron/30 blur-3xl" />
        <div className="animate-spin-slower absolute -inset-4 rounded-full border border-dashed border-white/15" />
        <Image src="/logo.png" alt="Vidyapeeth emblem" width={443} height={443} className="relative h-auto w-full rounded-full bg-white p-1 shadow-2xl" />
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {LOGO.symbols.map((sym, i) => {
            const I = ICONS[sym.key];
            const on = i === active;
            return (
              <button
                key={sym.key}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 transition ${on ? "text-ink" : "text-white/70 hover:text-white"}`}
              >
                {on && <motion.span layoutId="symbol-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", damping: 26, stiffness: 300 }} />}
                {!on && <span className="absolute inset-0 rounded-full ring-1 ring-white/15" />}
                <I className="relative h-4 w-4" />
                <span className="font-hindi relative text-base font-medium">{sym.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="glass mt-6 rounded-3xl p-7"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-saffron to-rust shadow-lg">
                <Icon className="h-7 w-7 text-white" />
              </span>
              <div>
                <p className="font-hindi text-3xl font-semibold text-white">{s.name}</p>
                <p className="text-sm text-white/50">{s.en}</p>
              </div>
            </div>
            <p className="font-hindi mt-4 inline-block rounded-full bg-saffron/15 px-3 py-1 text-gold-light">{s.essence}</p>
            <p className="font-hindi mt-4 line-clamp-6 leading-[1.9] text-white/75">{s.paragraphs[0]}</p>
            <Link href={`/our-logo#${s.key}`} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-gold-light hover:text-white">
              Read the full meaning <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
