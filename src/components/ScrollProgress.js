"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="no-print fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-saffron via-gold to-maroon"
    />
  );
}
