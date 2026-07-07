"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { SimulationProps } from "../engine/SimulationSection";

interface Config {
  readonly requestsPerSecond: number;
  readonly bucketCapacity: number;
  readonly refillRate: number;
}

interface LogEntry {
  readonly id: string;
  readonly accepted: boolean;
}

interface State {
  readonly tokens: number;
  readonly accepted: number;
  readonly rejected: number;
  readonly log: readonly LogEntry[];
}

const DEFAULT_CONFIG: Config = {
  requestsPerSecond: 5,
  bucketCapacity: 10,
  refillRate: 3,
};

function makeInitial(cfg: Config): State {
  return { tokens: cfg.bucketCapacity, accepted: 0, rejected: 0, log: [] };
}

export function RateLimiter({ isPlaying, speed }: SimulationProps) {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [state, setState] = useState<State>(() => makeInitial(DEFAULT_CONFIG));
  const counter = useRef(0);

  useEffect(() => {
    if (!isPlaying) return;
    const tickMs = Math.max(80, Math.floor(400 / speed));

    const id = setInterval(() => {
      setState((prev) => {
        const elapsed = tickMs / 1000;
        const refilled = Math.min(
          config.bucketCapacity,
          prev.tokens + config.refillRate * elapsed,
        );
        const count = Math.max(
          0,
          Math.round(
            config.requestsPerSecond * elapsed + (Math.random() - 0.45) * 0.6,
          ),
        );

        let tokens = refilled;
        let accepted = prev.accepted;
        let rejected = prev.rejected;
        const newEntries: LogEntry[] = [];

        for (let i = 0; i < count; i++) {
          const entryId = String(++counter.current);
          if (tokens >= 1) {
            tokens -= 1;
            accepted += 1;
            newEntries.push({ id: entryId, accepted: true });
          } else {
            rejected += 1;
            newEntries.push({ id: entryId, accepted: false });
          }
        }

        const log = [...newEntries, ...prev.log].slice(0, 14);
        return { tokens, accepted, rejected, log };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [isPlaying, speed, config]);

  const total = state.accepted + state.rejected;
  const acceptPct =
    total > 0 ? ((state.accepted / total) * 100).toFixed(1) : "—";
  const fill = state.tokens / config.bucketCapacity;

  function setField<K extends keyof Config>(key: K, val: number) {
    setConfig((c) => {
      const next = { ...c, [key]: val };
      if (key === "bucketCapacity") {
        setState(() => makeInitial(next));
      }
      return next;
    });
  }

  return (
    <div className="space-y-5">
      {/* Visualization */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Bucket */}
        <div className="border-border bg-surface rounded-xl border p-5">
          <p className="text-subtle mb-4 text-xs font-medium tracking-widest uppercase">
            Token Bucket
          </p>
          <div className="flex items-end gap-5">
            <div className="border-border bg-surface-raised relative h-28 w-14 overflow-hidden rounded-t rounded-b-xl border-2">
              <div
                className="bg-accent/80 absolute right-0 bottom-0 left-0 transition-all duration-300"
                style={{ height: `${fill * 100}%` }}
              />
              <span className="text-foreground absolute inset-0 flex items-center justify-center font-mono text-sm font-bold drop-shadow">
                {Math.floor(state.tokens)}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-muted text-[10px]">Tokens</p>
                <p className="text-foreground text-lg font-bold">
                  {Math.floor(state.tokens)}
                  <span className="text-subtle ml-1 text-xs font-normal">
                    / {config.bucketCapacity}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-muted text-[10px]">Refill rate</p>
                <p className="text-foreground text-sm font-semibold">
                  {config.refillRate} tok/s
                </p>
              </div>
              <div>
                <p className="text-muted text-[10px]">Fill level</p>
                <p className="text-foreground text-sm font-semibold">
                  {(fill * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Request log */}
        <div className="border-border bg-surface rounded-xl border p-5">
          <p className="text-subtle mb-3 text-xs font-medium tracking-widest uppercase">
            Request Log
          </p>
          <div className="h-32 space-y-1 overflow-hidden">
            {state.log.length === 0 ? (
              <p className="text-muted text-xs">Press ▶ to start simulation</p>
            ) : (
              state.log.map((entry) => (
                <div key={entry.id} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-black text-white",
                      entry.accepted ? "bg-emerald-500" : "bg-red-500",
                    )}
                    aria-hidden
                  >
                    {entry.accepted ? "✓" : "✗"}
                  </span>
                  <span className="text-muted font-mono text-[11px]">
                    req-{entry.id}
                  </span>
                  <span
                    className={cn(
                      "ml-auto text-[10px] font-semibold",
                      entry.accepted
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {entry.accepted ? "ACCEPT" : "REJECT"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox
          label="Accepted"
          value={state.accepted}
          color="text-emerald-600 dark:text-emerald-400"
        />
        <StatBox
          label="Rejected"
          value={state.rejected}
          color="text-red-600 dark:text-red-400"
        />
        <StatBox
          label="Accept Rate"
          value={`${acceptPct}%`}
          color="text-foreground"
        />
      </div>

      {/* Config controls */}
      <div className="border-border bg-surface space-y-3 rounded-xl border p-4">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Configuration
        </p>
        <RangeControl
          label="Request rate"
          value={config.requestsPerSecond}
          min={1}
          max={20}
          unit="req/s"
          onChange={(v) => setField("requestsPerSecond", v)}
        />
        <RangeControl
          label="Bucket capacity"
          value={config.bucketCapacity}
          min={3}
          max={30}
          unit="tokens"
          onChange={(v) => setField("bucketCapacity", v)}
        />
        <RangeControl
          label="Refill rate"
          value={config.refillRate}
          min={1}
          max={20}
          unit="tok/s"
          onChange={(v) => setField("refillRate", v)}
        />
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="border-border bg-surface rounded-lg border p-3 text-center">
      <p className="text-subtle text-[10px]">{label}</p>
      <p className={cn("mt-1 text-xl font-bold tabular-nums", color)}>
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
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
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
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-accent flex-1"
      />
      <span className="text-foreground w-18 text-right font-mono text-xs">
        {value} {unit}
      </span>
    </div>
  );
}
