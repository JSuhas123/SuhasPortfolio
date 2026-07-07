"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ControlPanel } from "./ControlPanel";

// Each simulation is a separate async chunk — zero cost until visited.
const SIMULATION_MAP = {
  "rate-limiter": dynamic(
    () =>
      import("../simulations/RateLimiter").then((m) => ({
        default: m.RateLimiter,
      })),
    { ssr: false },
  ),
  "load-balancer": dynamic(
    () =>
      import("../simulations/LoadBalancer").then((m) => ({
        default: m.LoadBalancer,
      })),
    { ssr: false },
  ),
  "distributed-cache": dynamic(
    () =>
      import("../simulations/DistributedCache").then((m) => ({
        default: m.DistributedCache,
      })),
    { ssr: false },
  ),
  "kafka-streaming": dynamic(
    () =>
      import("../simulations/KafkaStreaming").then((m) => ({
        default: m.KafkaStreaming,
      })),
    { ssr: false },
  ),
  "airport-scheduling": dynamic(
    () =>
      import("../simulations/AirportScheduling").then((m) => ({
        default: m.AirportScheduling,
      })),
    { ssr: false },
  ),
  "database-sharding": dynamic(
    () =>
      import("../simulations/DatabaseSharding").then((m) => ({
        default: m.DatabaseSharding,
      })),
    { ssr: false },
  ),
} as const;

type SimSlug = keyof typeof SIMULATION_MAP;

export interface SimulationProps {
  readonly isPlaying: boolean;
  readonly speed: number;
}

interface SimulationSectionProps {
  readonly slug: string;
}

/**
 * Client-side simulation container.
 * Owns Play/Pause/Reset/Speed state and passes it to the dynamic
 * simulation component. `key={resetKey}` unmounts/remounts the
 * simulation component on reset, clearing all local state.
 */
export function SimulationSection({ slug }: SimulationSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [resetKey, setResetKey] = useState(0);

  const SimComponent = SIMULATION_MAP[slug as SimSlug];

  if (!SimComponent) {
    return (
      <div className="border-border flex min-h-[300px] items-center justify-center rounded-xl border border-dashed">
        <p className="text-muted text-sm">Simulation not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ControlPanel
        isPlaying={isPlaying}
        speed={speed}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReset={() => {
          setIsPlaying(false);
          setResetKey((k) => k + 1);
        }}
        onSpeedChange={setSpeed}
      />

      <div className="border-border bg-surface-raised/30 rounded-xl border p-4 md:p-6">
        <SimComponent key={resetKey} isPlaying={isPlaying} speed={speed} />
      </div>
    </div>
  );
}
