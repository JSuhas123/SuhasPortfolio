"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating back-to-top button.
 * Appears after 400 px of scroll. Respects prefers-reduced-motion.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={cn(
        "fixed right-6 bottom-6 z-[600] flex h-10 w-10 items-center justify-center",
        "border-border bg-surface rounded-full border shadow-md",
        "text-muted transition-all duration-200",
        "hover:bg-surface-raised hover:text-foreground",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
    </button>
  );
}
