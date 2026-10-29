"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

// Full-bleed, slowly zooming crossfade behind the home hero. Pauses for reduced-motion users.
export default function HeroSlideshow({ photos, interval = 10000 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % photos.length), interval);
    return () => clearInterval(t);
  }, [photos.length, interval]);

  const p = photos[i];
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={p.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.03 }}
            animate={{ scale: 1.09 }}
            transition={{ duration: interval / 1000 + 2.5, ease: "linear" }}
          >
            <Image src={p.src} alt="" fill sizes="100vw" preload={i === 0} placeholder="blur" blurDataURL={p.blur} className="object-cover brightness-110 saturate-[1.15]" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
