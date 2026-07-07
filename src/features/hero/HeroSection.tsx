"use client";

import { Container } from "@/components/shared/Container";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroText } from "./HeroText";
import { NetworkScene } from "./NetworkScene";
import { ScrollIndicator } from "./ScrollIndicator";

/**
 * Full-viewport hero section.
 *
 * Layout
 * ──────
 *   [Three.js network — absolute, full section]
 *   [Radial vignette — blends canvas edges to background]
 *   [Text + CTA — centered, z-10]
 *   [Scroll indicator — bottom center]
 *
 * The section height is 100dvh minus the sticky header (3.5 rem / 56 px)
 * so the bottom of the hero aligns with the viewport bottom on load.
 *
 * Mouse parallax shifts the text content very slightly opposite to the
 * cursor direction, creating a subtle depth cue with zero GPU overhead
 * (pure CSS transform, hardware-accelerated via will-change).
 */
export function HeroSection() {
  const reduced = useReducedMotion();
  const mouse = useMouseParallax();

  const parallaxStyle =
    reduced || (mouse.x === 0 && mouse.y === 0)
      ? undefined
      : {
          transform: `translate(${mouse.x * -7}px, ${mouse.y * -4}px)`,
          transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        };

  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Three.js distributed network scene ─────────────────────────── */}
      <NetworkScene />

      {/*
       * Radial vignette: fades the canvas edges into the page background.
       * The gradient makes the network appear to "emerge" from the space
       * rather than sitting inside a hard-edged rectangle.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 10%, var(--background) 78%)",
        }}
      />

      {/* ── Hero text content ───────────────────────────────────────────── */}
      <Container className="relative z-10 py-16">
        <div style={parallaxStyle} className="will-change-transform">
          <HeroText />
        </div>
      </Container>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <ScrollIndicator className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" />
    </section>
  );
}
