"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeInSectionProps {
  readonly children: React.ReactNode;
  readonly className?: string | undefined;
  readonly delay?: number | undefined;
}

/**
 * Lightweight scroll-reveal wrapper.
 * Triggers once when the element enters the viewport.
 * No-ops when prefers-reduced-motion is active.
 */
export function FadeInSection({
  children,
  className,
  delay = 0,
}: FadeInSectionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
