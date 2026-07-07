"use client";

import { cn } from "@/lib/utils";
import { Pause, Play, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  readonly isPlaying: boolean;
  readonly speed: number;
  readonly onPlay: () => void;
  readonly onPause: () => void;
  readonly onReset: () => void;
  readonly onSpeedChange: (speed: number) => void;
}

const SPEEDS = [0.5, 1, 2, 4] as const;

/**
 * Shared simulation control bar: Play / Pause / Reset + Speed selector.
 * Used by every lab simulation — simulations manage their own config controls.
 */
export function ControlPanel({
  isPlaying,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
}: ControlPanelProps) {
  return (
    <div className="border-border bg-surface flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3">
      {/* Play / Pause */}
      <div className="flex items-center gap-1">
        <ControlButton
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          active={isPlaying}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" aria-hidden />
          ) : (
            <Play className="h-4 w-4" aria-hidden />
          )}
        </ControlButton>

        <ControlButton onClick={onReset} aria-label="Reset simulation">
          <RotateCcw className="h-4 w-4" aria-hidden />
        </ControlButton>
      </div>

      <div className="bg-border h-4 w-px" aria-hidden />

      {/* Speed selector */}
      <div className="flex items-center gap-2">
        <span className="text-subtle text-xs">Speed</span>
        <div className="flex gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSpeedChange(s)}
              aria-pressed={speed === s}
              className={cn(
                "rounded px-2 py-0.5 font-mono text-xs transition-colors",
                "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
                speed === s
                  ? "bg-foreground text-background"
                  : "bg-surface-raised text-muted hover:text-foreground",
              )}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Status indicator */}
      <div className="ml-auto flex items-center gap-1.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            isPlaying ? "animate-pulse bg-emerald-500" : "bg-border",
          )}
          aria-hidden
        />
        <span className="text-subtle text-xs">
          {isPlaying ? "Running" : "Paused"}
        </span>
      </div>
    </div>
  );
}

function ControlButton({
  children,
  onClick,
  active = false,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        active
          ? "bg-foreground text-background"
          : "bg-surface-raised text-foreground hover:bg-surface-raised/70",
      )}
    >
      {children}
    </button>
  );
}
