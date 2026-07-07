"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface ScrollIndicatorProps {
  readonly className?: string;
  /** id of the element to scroll into view on click */
  readonly targetId?: string;
}

const EASE_INOUT: [number, number, number, number] = [0.45, 0, 0.55, 1];

// Keyframe array typed as a tuple so Motion's TS types accept it
const BOUNCE_Y: [number, number, number] = [0, 6, 0];

const BOUNCE_TRANSITION = {
  repeat: Infinity,
  repeatType: "loop" as const,
  duration: 2,
  ease: EASE_INOUT,
} as const;

const BUTTON_CLASS =
  "group flex flex-col items-center gap-1 text-subtle transition-colors hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

/**
 * Minimal scroll indicator.
 * Clicking scrolls to a target element or by one viewport height.
 * Reduced motion: renders statically with no animation.
 */
export function ScrollIndicator({ className, targetId }: ScrollIndicatorProps) {
  const reduced = useReducedMotion();

  function handleClick() {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }

  if (reduced) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll to next section"
        className={cn(BUTTON_CLASS, className)}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
          scroll
        </span>
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      className={cn(BUTTON_CLASS, className)}
    >
      <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
        scroll
      </span>
      <motion.div animate={{ y: BOUNCE_Y }} transition={BOUNCE_TRANSITION}>
        <ChevronDown className="h-4 w-4" aria-hidden />
      </motion.div>
    </button>
  );
}
