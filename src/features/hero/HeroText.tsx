"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, type Variants } from "motion/react";
import { HeroCTA } from "./HeroCTA";

// Typed as a 4-tuple — Motion requires BezierDefinition, not number[]
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/**
 * Animated hero typography.
 * When prefers-reduced-motion is active, `initial={false}` skips animation
 * and renders every element at its final state immediately.
 */
export function HeroText() {
  const reduced = useReducedMotion();
  // initial={false} in Motion: bypass animation, render at resolved state
  const initial = reduced ? (false as const) : ("hidden" as const);

  return (
    <motion.div
      className="max-w-3xl"
      variants={STAGGER_CONTAINER}
      initial={initial}
      animate="visible"
    >
      {/* Small label */}
      <motion.p
        variants={FADE_UP}
        className="text-subtle font-mono text-xs tracking-[0.2em] uppercase"
      >
        AI Systems Engineer
      </motion.p>

      {/* Name — the typographic hero */}
      <motion.h1
        variants={FADE_UP}
        className="text-foreground mt-4 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
      >
        J Suhas
      </motion.h1>

      {/* Role */}
      <motion.p
        variants={FADE_UP}
        className="text-muted mt-3 text-xl font-light tracking-tight sm:text-2xl"
      >
        Distributed Systems · Full-Stack · Performance
      </motion.p>

      {/* Description */}
      <motion.p
        variants={FADE_UP}
        className="text-muted/80 mt-6 max-w-[44ch] text-base leading-relaxed sm:text-lg"
      >
        Building scalable software, <br className="hidden sm:block" />
        interactive engineering experiences, <br className="hidden sm:block" />
        and products that people remember.
      </motion.p>

      {/* CTAs */}
      <motion.div variants={FADE_UP}>
        <HeroCTA />
      </motion.div>
    </motion.div>
  );
}
