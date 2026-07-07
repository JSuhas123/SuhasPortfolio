"use client";

import { Line } from "@react-three/drei";

interface ConnectionProps {
  readonly start: [number, number, number];
  readonly end: [number, number, number];
  /** 0-1 — how visually prominent this connection is */
  readonly opacity: number;
  readonly isDark: boolean;
}

/**
 * A straight line connecting two network nodes.
 * Uses Drei's Line (THREE.LineSegments2) which supports sub-pixel widths.
 * Connections do not animate — only nodes float and packets travel.
 */
export function Connection({ start, end, opacity, isDark }: ConnectionProps) {
  const color = isDark ? "#6b59e8" : "#c4bfff";
  const lineWidth = isDark ? 0.8 : 0.6;

  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
    />
  );
}
