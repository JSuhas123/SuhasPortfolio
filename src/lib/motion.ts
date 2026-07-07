/**
 * Motion animation presets for use with the `motion` library (v12+).
 *
 * Usage:
 *   import { fadeUp, staggerContainer } from "@/lib/motion";
 *   import { motion } from "motion/react";
 *   import { useReducedMotion } from "motion/react";
 *
 *   function MyComponent() {
 *     const reduced = useReducedMotion();
 *     return (
 *       <motion.div
 *         variants={reduced ? {} : fadeUp}
 *         initial="hidden"
 *         animate="visible"
 *       />
 *     );
 *   }
 *
 * All transforms respect prefers-reduced-motion when consumers use
 * useReducedMotion() or when the global CSS rule fires (0.01ms durations).
 */

import type { Transition, Variants } from "motion/react";

// ─── Transitions ─────────────────────────────────────────────────────────────

export const easeOut: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};

export const easeOutFast: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// ─── Variants ────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOutFast },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: easeOut },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: easeOut },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: easeOut },
};

/**
 * Wrap a list container with this variant, then apply individual item
 * variants (e.g. fadeUp) to children to get a staggered entrance.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/**
 * Subtle hover lift for interactive cards.
 * Apply via `whileHover="lift"` on a motion element.
 */
export const hoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  lift: { y: -3, scale: 1.01, transition: easeOutFast },
};

// ─── Page transition ──────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: easeOut },
  exit: { opacity: 0, y: -8, transition: easeOutFast },
};
