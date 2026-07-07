"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Fixed reading progress bar at the top of the viewport.
 * Renders below the sticky header (z-[199]).
 */
export function ProjectProgress() {
  const progress = useScrollProgress();

  // Native <progress> with custom styles — semantic and accessible.
  // Appearance is reset via Tailwind so it renders as a thin bar.
  return (
    <progress
      className="bg-border [&::-webkit-progress-bar]:bg-border [&::-webkit-progress-value]:bg-accent [&::-moz-progress-bar]:bg-accent fixed top-14 right-0 left-0 z-[199] h-[2px] w-full appearance-none"
      aria-label="Reading progress"
      value={progress}
      max={1}
    />
  );
}
