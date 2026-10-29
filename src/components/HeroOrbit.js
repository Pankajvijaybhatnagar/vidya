"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Flame, Flower2, Shell, Sun } from "lucide-react";

const SYMBOLS = [
  { icon: Sun, label: "सूर्य", pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { icon: Flower2, label: "कमल", pos: "right-0 top-1/2 translate-x-1/3 -translate-y-1/2" },
  { icon: Flame, label: "दीपक", pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { icon: Shell, label: "शंख", pos: "left-0 top-1/2 -translate-x-1/3 -translate-y-1/2" },
];

// The emblem tilts toward the cursor while the four logo symbols orbit around it.
export default function HeroOrbit() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 14 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative mx-auto aspect-square w-full max-w-[26rem] [perspective:1000px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-saffron/25 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-white/15" />

      {/* Orbiting symbols: the ring spins one way, each chip spins back so it stays upright */}
      <div className="animate-spin-slow absolute inset-[4%]">
        {SYMBOLS.map(({ icon: Icon, label, pos }) => (
          <div key={label} className={`absolute ${pos}`}>
            <div className="animate-spin-slow [animation-direction:reverse]">
              <div className="glass flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 shadow-xl">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-saffron to-rust">
                  <Icon className="h-4 w-4 text-white" />
                </span>
                <span className="font-hindi text-sm text-white">{label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="absolute inset-[22%] [transform-style:preserve-3d]">
        <div className="absolute inset-0 rounded-full bg-white shadow-[0_30px_80px_-20px_rgba(234,122,20,0.6)]" />
        <Image
          src="/logo.png"
          alt="Vidyapeeth emblem"
          fill
          sizes="(min-width: 1024px) 15rem, 50vw"
          preload
          className="rounded-full object-contain p-1 [transform:translateZ(40px)]"
        />
      </motion.div>
    </div>
  );
}
