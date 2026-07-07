"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NetworkCanvas = dynamic(() => import("./scene/NetworkCanvas"), {
  ssr: false,
  loading: () => null,
});

interface NetworkSceneProps {
  readonly className?: string;
}

/**
 * Lazy-loaded Three.js network scene.
 *
 * • Code-split: the entire Three.js + R3F + Drei bundle only loads when
 *   this component renders on the client.
 * • ssr: false  prevents any server-side execution of WebGL code.
 * • Reduced motion: renders nothing, preserving accessibility.
 * • Mobile (<640 px): scene renders with lower quality settings (no
 *   anti-aliasing, half-res, hub-only topology, no packets).
 *
 * aria-hidden="true" — the canvas is purely decorative.
 */
export function NetworkScene({ className }: NetworkSceneProps) {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const isDark = resolvedTheme === "dark";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <NetworkCanvas isDark={isDark} isMobile={isMobile} />
      </Suspense>
    </div>
  );
}
