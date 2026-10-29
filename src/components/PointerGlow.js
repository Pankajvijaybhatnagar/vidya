"use client";

import { useEffect } from "react";

// Feeds the cursor position to the nearest `.spotlight` element for its hover glow.
export default function PointerGlow() {
  useEffect(() => {
    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest(".spotlight") : null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
