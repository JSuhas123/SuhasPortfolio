"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section ID is currently in the reading viewport using
 * IntersectionObserver. The "active" section is the first one whose
 * top edge is within the upper 30% of the viewport.
 *
 * rootMargin: "-20% 0px -65% 0px" means the trigger zone is a band
 * starting 20% from the top and ending 65% from the bottom.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, [sectionIds]);

  return active;
}
