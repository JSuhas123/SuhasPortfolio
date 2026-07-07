"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { SimulationProps } from "../engine/SimulationSection";

type Priority = "emergency" | "critical" | "scheduled" | "delayed";
type RunwayStatus = "available" | "occupied";

interface Aircraft {
  readonly id: string;
  readonly callsign: string;
  readonly priority: Priority;
  readonly waitSince: number;
  readonly airline: string;
}

interface Runway {
  readonly id: number;
  status: RunwayStatus;
  currentAircraft: Aircraft | null;
  occupiedUntil: number;
  readonly label: string;
}

interface State {
  readonly queue: readonly Aircraft[];
  readonly runways: readonly Runway[];
  readonly completed: readonly {
    readonly callsign: string;
    readonly priority: Priority;
    readonly waited: number;
  }[];
  readonly stats: {
    readonly onTime: number;
    readonly delayed: number;
    readonly emergency: number;
  };
}

const AIRLINES = ["UA", "AA", "DL", "SW", "BA", "LH", "AF", "EK"];
const PRIORITY_SCORE: Record<Priority, number> = {
  emergency: 1000,
  critical: 100,
  scheduled: 10,
  delayed: 1,
};
const PRIORITY_COLOR: Record<Priority, string> = {
  emergency: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  critical:
    "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
  scheduled:
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  delayed: "bg-surface-raised border-border text-muted",
};

let acCounter = 0;
function makeAircraft(priority?: Priority): Aircraft {
  const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)] ?? "UA";
  const flight = String(100 + Math.floor(Math.random() * 900));
  const p: Priority =
    priority ??
    (Math.random() < 0.05
      ? "emergency"
      : Math.random() < 0.15
        ? "critical"
        : Math.random() < 0.6
          ? "scheduled"
          : "delayed");
  return {
    id: String(++acCounter),
    callsign: `${airline}${flight}`,
    priority: p,
    waitSince: Date.now(),
    airline,
  };
}

function makeInitial(): State {
  return {
    queue: Array.from({ length: 4 }, () => makeAircraft()),
    runways: [
      {
        id: 0,
        status: "available",
        currentAircraft: null,
        occupiedUntil: 0,
        label: "28L",
      },
      {
        id: 1,
        status: "available",
        currentAircraft: null,
        occupiedUntil: 0,
        label: "28R",
      },
    ],
    completed: [],
    stats: { onTime: 0, delayed: 0, emergency: 0 },
  };
}

export function AirportScheduling({ isPlaying, speed }: SimulationProps) {
  const [arrivalRate, setArrivalRate] = useState(0.4);
  const [state, setState] = useState<State>(makeInitial);

  function triggerEmergency() {
    setState((prev) => ({
      ...prev,
      queue: [makeAircraft("emergency"), ...prev.queue],
    }));
  }

  useEffect(() => {
    if (!isPlaying) return;
    const tickMs = Math.max(100, Math.floor(500 / speed));

    const id = setInterval(() => {
      const now = Date.now();
      setState((prev) => {
        let queue = [...prev.queue];
        const runways = prev.runways.map((r) => ({ ...r }));
        const stats = { ...prev.stats };
        const completed = [...prev.completed];

        // Arrive new aircraft
        if (Math.random() < arrivalRate * (tickMs / 1000) * speed * 2) {
          queue.push(makeAircraft());
        }

        // Free completed runways
        for (const runway of runways) {
          if (runway.status === "occupied" && now >= runway.occupiedUntil) {
            if (runway.currentAircraft) {
              const waited = (now - runway.currentAircraft.waitSince) / 1000;
              completed.unshift({
                callsign: runway.currentAircraft.callsign,
                priority: runway.currentAircraft.priority,
                waited: Math.round(waited),
              });
              if (runway.currentAircraft.priority === "emergency")
                stats.emergency += 1;
              else if (runway.currentAircraft.priority === "delayed")
                stats.delayed += 1;
              else stats.onTime += 1;
            }
            runway.status = "available";
            runway.currentAircraft = null;
          }
        }

        // Assign queue → available runways (priority scheduling with aging)
        for (const runway of runways) {
          if (runway.status !== "available" || queue.length === 0) continue;

          // Select highest-priority aircraft from queue
          const best = queue
            .map((ac) => ({
              ac,
              score: PRIORITY_SCORE[ac.priority] + (now - ac.waitSince) / 500,
            }))
            .sort((a, b) => b.score - a.score)
            .at(0)?.ac;

          if (!best) continue;

          queue = queue.filter((a) => a.id !== best.id);
          const serviceTime = (3000 + Math.random() * 4000) / speed;
          runway.status = "occupied";
          runway.currentAircraft = { ...best, waitSince: best.waitSince };
          runway.occupiedUntil = now + serviceTime;
        }

        const recentCompleted = completed.slice(0, 6);

        return {
          queue: queue.slice(0, 12), // cap queue size
          runways,
          completed: recentCompleted,
          stats,
        };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [isPlaying, speed, arrivalRate]);

  return (
    <div className="space-y-5">
      {/* Runways */}
      <div className="space-y-3">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Runways
        </p>
        {state.runways.map((runway) => (
          <div
            key={runway.id}
            className="border-border bg-surface rounded-xl border p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-foreground font-mono text-sm font-bold">
                RWY {runway.label}
              </p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  runway.status === "available"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                )}
              >
                {runway.status === "available" ? "AVAILABLE" : "OCCUPIED"}
              </span>
            </div>
            {runway.currentAircraft && (
              <div
                className={cn(
                  "mt-3 rounded-lg border p-2",
                  PRIORITY_COLOR[runway.currentAircraft.priority],
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm font-bold">
                    {runway.currentAircraft.callsign}
                  </p>
                  <span className="text-[10px] font-medium uppercase">
                    {runway.currentAircraft.priority}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Queue */}
      <div>
        <p className="text-subtle mb-2 text-xs font-medium tracking-widest uppercase">
          Queue ({state.queue.length} aircraft)
        </p>
        <div className="flex flex-wrap gap-2">
          {state.queue.map((ac) => (
            <div
              key={ac.id}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-center",
                PRIORITY_COLOR[ac.priority],
              )}
            >
              <p className="font-mono text-xs font-bold">{ac.callsign}</p>
              <p className="text-[9px]">{ac.priority}</p>
            </div>
          ))}
          {state.queue.length === 0 && (
            <p className="text-muted text-xs">No aircraft queued</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <MiniStat label="On time" value={state.stats.onTime} />
        <MiniStat label="Delayed" value={state.stats.delayed} />
        <MiniStat
          label="Emergency"
          value={state.stats.emergency}
          highlight={state.stats.emergency > 0}
        />
      </div>

      {/* Controls */}
      <div className="border-border bg-surface space-y-3 rounded-xl border p-4">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Configuration
        </p>
        <RangeControl
          label="Arrival rate"
          value={arrivalRate}
          min={0.1}
          max={1.0}
          step={0.1}
          unit="ac/s"
          onChange={setArrivalRate}
        />
        <button
          type="button"
          onClick={triggerEmergency}
          className="focus-visible:ring-accent rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/20 focus-visible:ring-2 focus-visible:outline-none dark:text-red-400"
        >
          🚨 Trigger Emergency Landing
        </button>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg border p-3",
        highlight ? "border-red-500/30" : "border-border",
      )}
    >
      <p className="text-subtle text-[10px]">{label}</p>
      <p className="text-foreground mt-1 font-mono text-base font-bold tabular-nums">
        {value}
      </p>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-muted w-28 text-xs">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-accent flex-1"
      />
      <span className="text-foreground w-16 text-right font-mono text-xs">
        {value.toFixed(1)} {unit}
      </span>
    </div>
  );
}
