"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { SimulationProps } from "../engine/SimulationSection";

interface Shard {
  readonly id: number;
  readonly name: string;
  readonly rangeStart: number; // 0-255 hash range start
  readonly rangeEnd: number;
  keyCount: number;
  readonly color: string;
}

interface QueryEvent {
  readonly id: string;
  readonly key: string;
  readonly hash: number;
  readonly shardId: number;
}

interface State {
  readonly shards: readonly Shard[];
  readonly recentQueries: readonly QueryEvent[];
  readonly activeShardId: number | null;
  readonly totalQueries: number;
}

const SHARD_COLORS = [
  "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400",
];

const ACTIVE_BORDER = [
  "border-blue-500 bg-blue-500/20 text-blue-600 dark:text-blue-400",
  "border-violet-500 bg-violet-500/20 text-violet-600 dark:text-violet-400",
  "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400",
  "border-pink-500 bg-pink-500/20 text-pink-600 dark:text-pink-400",
];

function makeShards(count: number): Shard[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `shard-${i}`,
    rangeStart: Math.floor((i / count) * 256),
    rangeEnd: Math.floor(((i + 1) / count) * 256) - 1,
    keyCount: 0,
    color: SHARD_COLORS[i % SHARD_COLORS.length] ?? SHARD_COLORS[0] ?? "",
  }));
}

function makeInitial(shardCount: number): State {
  return {
    shards: makeShards(shardCount),
    recentQueries: [],
    activeShardId: null,
    totalQueries: 0,
  };
}

// Simple djb2-style hash → 0-255
function hashKey(key: string): number {
  let h = 5381;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) + h + (key.codePointAt(i) ?? 0)) & 0xffffffff;
  }
  return Math.abs(h) % 256;
}

const SAMPLE_KEYS = [
  "user:1001",
  "user:2048",
  "user:3500",
  "order:9901",
  "order:1234",
  "product:42",
  "product:99",
  "session:abc",
  "session:xyz",
  "config:env",
  "payment:777",
  "cart:555",
  "item:888",
  "profile:444",
];

let qCounter = 0;

export function DatabaseSharding({ isPlaying, speed }: SimulationProps) {
  const [shardCount, setShardCount] = useState(3);
  const [queryRate, setQueryRate] = useState(2);
  const [state, setState] = useState<State>(() => makeInitial(3));

  // Reset when shard count changes
  useEffect(() => {
    setState(makeInitial(shardCount));
  }, [shardCount]);

  useEffect(() => {
    if (!isPlaying) return;
    const tickMs = Math.max(100, Math.floor(1000 / (speed * queryRate)));

    const id = setInterval(() => {
      setState((prev) => {
        const key =
          SAMPLE_KEYS[Math.floor(Math.random() * SAMPLE_KEYS.length)] ??
          "user:1001";
        const h = hashKey(key);
        const targetShard = prev.shards.find(
          (s) => h >= s.rangeStart && h <= s.rangeEnd,
        );
        const shardId = targetShard?.id ?? 0;

        const shards = prev.shards.map((s) => ({
          ...s,
          keyCount: s.id === shardId ? s.keyCount + 1 : s.keyCount,
        }));

        const query: QueryEvent = {
          id: String(++qCounter),
          key,
          hash: h,
          shardId,
        };

        const recentQueries = [query, ...prev.recentQueries].slice(0, 8);

        return {
          shards,
          recentQueries,
          activeShardId: shardId,
          totalQueries: prev.totalQueries + 1,
        };
      });

      // Clear active highlight after 400ms
      setTimeout(() => {
        setState((prev) => ({ ...prev, activeShardId: null }));
      }, 400);
    }, tickMs);

    return () => clearInterval(id);
  }, [isPlaying, speed, queryRate]);

  const maxKeyCount = Math.max(...state.shards.map((s) => s.keyCount), 1);

  return (
    <div className="space-y-5">
      {/* Architecture diagram */}
      <div className="overflow-x-auto">
        <div className="min-w-[400px] space-y-4">
          {/* Application tier */}
          <div className="flex justify-center">
            <div className="border-border bg-surface rounded-lg border px-6 py-2 text-center">
              <p className="text-foreground text-xs font-semibold">
                Application
              </p>
              <p className="text-muted text-[9px]">sends queries</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-subtle flex justify-center text-xs">
            ↓ query(key)
          </div>

          {/* Shard router */}
          <div className="flex justify-center">
            <div className="border-accent/30 bg-accent/5 rounded-lg border px-6 py-2 text-center">
              <p className="text-accent text-xs font-semibold">Shard Router</p>
              <p className="text-muted text-[9px]">
                consistent hash(key) → shard
              </p>
            </div>
          </div>

          {/* Arrows */}
          <div className="text-subtle flex justify-center text-xs">
            ↓ route to shard
          </div>

          {/* Shards */}
          <div className="flex justify-center gap-3">
            {state.shards.map((shard) => {
              const isActive = state.activeShardId === shard.id;
              const colorClass = isActive
                ? (ACTIVE_BORDER[shard.id % ACTIVE_BORDER.length] ??
                  ACTIVE_BORDER[0] ??
                  "")
                : (SHARD_COLORS[shard.id % SHARD_COLORS.length] ??
                  SHARD_COLORS[0] ??
                  "");
              return (
                <div
                  key={shard.id}
                  className={cn(
                    "min-w-[100px] rounded-xl border-2 p-3 text-center transition-all duration-300",
                    colorClass,
                    isActive && "scale-105 shadow-md",
                  )}
                >
                  <p className="font-mono text-xs font-bold">{shard.name}</p>
                  <p className="text-[9px] opacity-70">
                    hash {shard.rangeStart}–{shard.rangeEnd}
                  </p>
                  {/* Distribution bar */}
                  <div className="mt-2 h-1.5 w-full rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-current opacity-60 transition-all duration-300"
                      style={{
                        width: `${(shard.keyCount / maxKeyCount) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 font-mono text-[10px]">
                    {shard.keyCount} keys
                  </p>

                  {/* Replica indicator */}
                  <div className="mt-2 flex justify-center gap-1">
                    <div
                      className="h-2 w-2 rounded-sm border border-current opacity-60"
                      title="Primary"
                    />
                    <div
                      className="h-2 w-2 rounded-sm border border-current opacity-40"
                      title="Replica"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent query log */}
      <div className="border-border bg-surface rounded-xl border p-4">
        <p className="text-subtle mb-2 text-[10px] font-medium tracking-widest uppercase">
          Query Routing Log
        </p>
        <div className="space-y-1">
          {state.recentQueries.length === 0 && (
            <p className="text-muted text-xs">
              Press ▶ to start routing queries
            </p>
          )}
          {state.recentQueries.map((q) => {
            const shard = state.shards.find((s) => s.id === q.shardId);
            return (
              <div key={q.id} className="flex items-center gap-2">
                <span className="text-muted flex-1 truncate font-mono text-[10px]">
                  GET {q.key}
                </span>
                <span className="text-subtle font-mono text-[10px]">
                  h:{q.hash}
                </span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold",
                    SHARD_COLORS[q.shardId % SHARD_COLORS.length] ??
                      SHARD_COLORS[0] ??
                      "",
                  )}
                >
                  {shard?.name ?? "shard-0"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Total queries" value={state.totalQueries} />
        <MiniStat label="Shards" value={shardCount} />
        {state.shards.slice(0, 2).map((s) => (
          <MiniStat
            key={s.id}
            label={`${s.name} load`}
            value={`${((s.keyCount / Math.max(state.totalQueries, 1)) * 100).toFixed(0)}%`}
          />
        ))}
      </div>

      {/* Config */}
      <div className="border-border bg-surface space-y-3 rounded-xl border p-4">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Configuration
        </p>
        <RangeControl
          label="Shard count"
          value={shardCount}
          min={2}
          max={5}
          unit=""
          onChange={setShardCount}
        />
        <RangeControl
          label="Query rate"
          value={queryRate}
          min={1}
          max={8}
          unit="q/s"
          onChange={setQueryRate}
        />
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
        {value}
        {unit ? ` ${unit}` : ""}
      </span>
    </div>
  );
}
