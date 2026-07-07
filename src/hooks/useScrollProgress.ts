"use client";

import { useEffect, useState } from "react";

/**
 * Tracks reading progress as a 0–1 fraction of total scrollable distance.
 * Throttled via requestAnimationFrame; re-renders at most 60 times/second.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(scrolled / total, 1) : 0);
      rafId = null;
    }

    function onScroll() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}
