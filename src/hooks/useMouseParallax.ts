"use client";

import { useEffect, useRef, useState } from "react";

export interface MousePosition {
  readonly x: number; // -1 (left) → +1 (right)
  readonly y: number; // -1 (bottom) → +1 (top)
}

/**
 * Tracks the mouse position normalised to [-1, 1] on each axis.
 * Throttled to one update per animation frame so React only re-renders
 * at 60 fps maximum.
 */
export function useMouseParallax(): MousePosition {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const latest = useRef<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      latest.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };

      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        setMouse(latest.current);
        rafId.current = null;
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      const id = rafId.current;
      if (id !== null) cancelAnimationFrame(id);
    };
  }, []);

  return mouse;
}
