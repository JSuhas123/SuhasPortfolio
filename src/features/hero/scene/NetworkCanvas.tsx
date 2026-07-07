"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { NetworkGraph } from "./NetworkGraph";

interface NetworkCanvasProps {
  readonly isDark: boolean;
  readonly isMobile: boolean;
}

/**
 * R3F Canvas — SSR is disabled at the import site (NetworkScene.tsx).
 * dpr is capped to avoid excessive GPU usage on hi-DPI screens.
 * alpha: true makes the canvas background transparent so the page
 * background shows through; the vignette in HeroSection blends the edges.
 */
export default function NetworkCanvas({
  isDark,
  isMobile,
}: NetworkCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      }}
      dpr={isMobile ? 1 : [1, 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <NetworkGraph isDark={isDark} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
