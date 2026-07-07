"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { SimulationProps } from "../engine/SimulationSection";

type Algorithm = "round-robin" | "least-connections";

interface Server {
  readonly id: string;
  readonly name: string;
  connections: number;
  totalHandled: number;
  healthy: boolean;
}

interface State {
  readonly servers: Server[];
  readonly cursor: number;
  readonly totalRequests: number;
  readonly lastRouted: string | null;
  readonly lastAlgorithm: string | null;
}

function makeServers(count: number): Server[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i),
    name: `server-${i + 1}`,
    connections: 0,
    totalHandled: 0,
    healthy: true,
  }));
}

function makeInitial(count: number): State {
  return {
    servers: makeServers(count),
    cursor: 0,
    totalRequests: 0,
    lastRouted: null,
    lastAlgorithm: null,
  };
}

export function LoadBalancer({ isPlaying, speed }: SimulationProps) {
  const [algorithm, setAlgorithm] = useState<Algorithm>("round-robin");
  const [requestRate, setRequestRate] = useState(3);
  const [state, setState] = useState<State>(() => makeInitial(3));

  useEffect(() => {
    if (!isPlaying) return;
    const tickMs = Math.max(80, Math.floor(600 / (speed * requestRate)));

    const id = setInterval(() => {
      setState((prev) => {
        const healthy = prev.servers.filter((s) => s.healthy);
        if (healthy.length === 0) return prev;

        let chosen: Server | undefined;
        let newCursor = prev.cursor;

        if (algorithm === "round-robin") {
          const idx = prev.cursor % healthy.length;
          chosen = healthy[idx];
          newCursor = (prev.cursor + 1) % healthy.length;
        } else {
          chosen = healthy
            .slice()
            .sort((a, b) => a.connections - b.connections)[0];
        }

        if (!chosen) return prev;
        const chosenId = chosen.id;

        // Connections increase on route, decay over time
        const servers = prev.servers.map((s) => {
          const decayed = Math.max(0, s.connections - 0.3);
          if (s.id === chosenId) {
            return {
              ...s,
              connections: decayed + 1,
              totalHandled: s.totalHandled + 1,
            };
          }
          return { ...s, connections: decayed };
        });

        return {
          servers,
          cursor: newCursor,
          totalRequests: prev.totalRequests + 1,
          lastRouted: chosen.name,
          lastAlgorithm: algorithm,
        };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [isPlaying, speed, algorithm, requestRate]);

  function toggleHealth(id: string) {
    setState((prev) => ({
      ...prev,
      servers: prev.servers.map((s) =>
        s.id === id ? { ...s, healthy: !s.healthy } : s,
      ),
    }));
  }

  const maxHandled = Math.max(...state.servers.map((s) => s.totalHandled), 1);

  return (
    <div className="space-y-5">
      {/* Server grid */}
      <div className="grid gap-3 sm:grid-cols-3">
        {state.servers.map((server) => (
          <div
            key={server.id}
            className={cn(
              "rounded-xl border p-4 transition-colors",
              server.healthy
                ? state.lastRouted === server.name
                  ? "border-accent/40 bg-accent/5"
                  : "border-border bg-surface"
                : "border-border bg-surface/50 border-dashed opacity-60",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-foreground font-mono text-xs font-semibold">
                {server.name}
              </p>
              <button
                type="button"
                onClick={() => toggleHealth(server.id)}
                title={server.healthy ? "Kill server" : "Restore server"}
                className={cn(
                  "h-3 w-3 rounded-full transition-colors",
                  server.healthy ? "bg-emerald-500" : "bg-red-500",
                )}
                aria-label={
                  server.healthy
                    ? `Kill ${server.name}`
                    : `Restore ${server.name}`
                }
              />
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-muted text-[10px]">Active connections</p>
                <div className="bg-surface-raised mt-1 h-1.5 w-full rounded-full">
                  <div
                    className="bg-accent h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (server.connections / 8) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-foreground mt-0.5 font-mono text-xs">
                  {server.connections.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-muted text-[10px]">Total handled</p>
                <div className="bg-surface-raised mt-1 h-1.5 w-full rounded-full">
                  <div
                    className="bg-border h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(server.totalHandled / maxHandled) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-foreground mt-0.5 font-mono text-xs">
                  {server.totalHandled}
                </p>
              </div>
            </div>
            {!server.healthy && (
              <p className="mt-2 text-[10px] font-medium text-red-500">
                OFFLINE
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Routing indicator */}
      {state.lastRouted && (
        <div className="border-border bg-surface rounded-lg border px-4 py-2">
          <p className="text-muted text-xs">
            Last request →{" "}
            <span className="text-foreground font-mono font-semibold">
              {state.lastRouted}
            </span>
            <span className="text-subtle ml-2">({state.lastAlgorithm})</span>
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Total requests" value={state.totalRequests} />
        <MiniStat
          label="Healthy servers"
          value={state.servers.filter((s) => s.healthy).length}
        />
        <MiniStat
          label="Algorithm"
          value={algorithm === "round-robin" ? "RR" : "LC"}
        />
        <MiniStat label="Req rate" value={`${requestRate}/s`} />
      </div>

      {/* Config */}
      <div className="border-border bg-surface space-y-3 rounded-xl border p-4">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Configuration
        </p>
        <div className="flex items-center gap-3">
          <span className="text-muted w-28 text-xs">Algorithm</span>
          <div className="flex gap-2">
            {(["round-robin", "least-connections"] as const).map((alg) => (
              <button
                key={alg}
                type="button"
                onClick={() => setAlgorithm(alg)}
                className={cn(
                  "focus-visible:ring-accent rounded px-2.5 py-1 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  algorithm === alg
                    ? "bg-foreground text-background"
                    : "bg-surface-raised text-muted hover:text-foreground",
                )}
              >
                {alg === "round-robin" ? "Round Robin" : "Least Connections"}
              </button>
            ))}
          </div>
        </div>
        <RangeControl
          label="Request rate"
          value={requestRate}
          min={1}
          max={10}
          unit="req/s"
          onChange={setRequestRate}
        />
        <p className="text-subtle text-[10px]">
          Click the server indicator dot to toggle server health
        </p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border-border bg-surface rounded-lg border p-3">
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
      <span className="text-foreground w-14 text-right font-mono text-xs">
        {value} {unit}
      </span>
    </div>
  );
}
