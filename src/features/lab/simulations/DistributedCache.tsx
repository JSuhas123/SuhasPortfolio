"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { SimulationProps } from "../engine/SimulationSection";

interface CacheSlot {
  readonly key: string;
  readonly value: string;
  ttlRemaining: number; // 0-1 fraction
  lastAccessed: number; // timestamp ms
  readonly accessCount: number;
}

interface LogEntry {
  readonly id: string;
  readonly key: string;
  readonly hit: boolean;
}

interface State {
  readonly slots: Map<string, CacheSlot>;
  readonly hits: number;
  readonly misses: number;
  readonly evictions: number;
  readonly log: readonly LogEntry[];
}

const DB_KEYS = [
  "user:1001",
  "user:1002",
  "user:1003",
  "product:42",
  "product:43",
  "product:44",
  "product:45",
  "session:abc",
  "session:def",
  "config:feature-flags",
  "post:100",
  "post:101",
] as const;

const DB_VALUES: Record<string, string> = {
  "user:1001": "{name:'Alice'}",
  "user:1002": "{name:'Bob'}",
  "user:1003": "{name:'Carol'}",
  "product:42": "{price:29.99}",
  "product:43": "{price:99.00}",
  "product:44": "{price:14.99}",
  "product:45": "{price:199.00}",
  "session:abc": "{userId:1001}",
  "session:def": "{userId:1002}",
  "config:feature-flags": "{darkMode:true}",
  "post:100": "{title:'Intro'}",
  "post:101": "{title:'Adv.'}",
};

// Hot keys are accessed more often (simulates real-world skewed access)
const HOT_KEYS = [
  "user:1001",
  "product:42",
  "session:abc",
  "config:feature-flags",
];

function pickKey(distribution: "uniform" | "skewed"): string {
  if (distribution === "skewed" && Math.random() < 0.7) {
    const hotKey = HOT_KEYS[Math.floor(Math.random() * HOT_KEYS.length)];
    return hotKey ?? DB_KEYS[0] ?? "user:1001";
  }
  const key = DB_KEYS[Math.floor(Math.random() * DB_KEYS.length)];
  return key ?? "user:1001";
}

function makeInitial(): State {
  return { slots: new Map(), hits: 0, misses: 0, evictions: 0, log: [] };
}

let logCounter = 0;

export function DistributedCache({ isPlaying, speed }: SimulationProps) {
  const [capacity, setCapacity] = useState(6);
  const [ttlSeconds, setTtlSeconds] = useState(8);
  const [distribution, setDistribution] = useState<"uniform" | "skewed">(
    "skewed",
  );
  const [state, setState] = useState<State>(makeInitial);

  useEffect(() => {
    if (!isPlaying) return;
    const tickMs = Math.max(100, Math.floor(800 / speed));

    const id = setInterval(() => {
      setState((prev) => {
        const key = pickKey(distribution);
        const now = Date.now();
        const slots = new Map(prev.slots);

        // Decay TTL for all slots
        for (const [k, slot] of slots) {
          const decayed = slot.ttlRemaining - tickMs / (ttlSeconds * 1000);
          if (decayed <= 0) {
            slots.delete(k); // TTL expired
          } else {
            slots.set(k, { ...slot, ttlRemaining: decayed });
          }
        }

        const existing = slots.get(key);
        let hits = prev.hits;
        let misses = prev.misses;
        let evictions = prev.evictions;
        const logId = String(++logCounter);

        if (existing) {
          // Cache HIT
          hits += 1;
          slots.set(key, {
            ...existing,
            lastAccessed: now,
            accessCount: existing.accessCount + 1,
          });
          const log = [{ id: logId, key, hit: true }, ...prev.log].slice(0, 10);
          return { slots, hits, misses, evictions, log };
        }

        // Cache MISS — fetch from "database" and insert
        misses += 1;

        if (slots.size >= capacity) {
          // LRU eviction: remove least recently accessed
          let lruKey: string | null = null;
          let lruTime = Infinity;
          for (const [k, slot] of slots) {
            if (slot.lastAccessed < lruTime) {
              lruTime = slot.lastAccessed;
              lruKey = k;
            }
          }
          if (lruKey) {
            slots.delete(lruKey);
            evictions += 1;
          }
        }

        const value = DB_VALUES[key] ?? "{...}";
        slots.set(key, {
          key,
          value,
          ttlRemaining: 1,
          lastAccessed: now,
          accessCount: 1,
        });

        const log = [{ id: logId, key, hit: false }, ...prev.log].slice(0, 10);
        return { slots, hits, misses, evictions, log };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [isPlaying, speed, capacity, ttlSeconds, distribution]);

  const total = state.hits + state.misses;
  const hitRate = total > 0 ? ((state.hits / total) * 100).toFixed(1) : "—";
  const slots = Array.from(state.slots.values());

  return (
    <div className="space-y-5">
      {/* Cache grid */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {Array.from({ length: capacity }).map((_, i) => {
          const slot = slots[i];
          return (
            <div
              key={i}
              className={cn(
                "relative overflow-hidden rounded-lg border p-2 transition-all duration-300",
                slot
                  ? slot.ttlRemaining > 0.5
                    ? "border-accent/30 bg-accent/10"
                    : "border-amber-500/30 bg-amber-500/10"
                  : "border-border bg-surface/50 border-dashed",
              )}
            >
              {slot ? (
                <>
                  <p className="text-foreground truncate font-mono text-[9px] font-semibold">
                    {slot.key.split(":")[0]}
                  </p>
                  <p className="text-muted truncate font-mono text-[8px]">
                    :{slot.key.split(":")[1]}
                  </p>
                  {/* TTL bar */}
                  <div className="bg-border mt-1 h-0.5 w-full rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        slot.ttlRemaining > 0.5 ? "bg-accent" : "bg-amber-500",
                      )}
                      style={{ width: `${slot.ttlRemaining * 100}%` }}
                    />
                  </div>
                  <p className="text-subtle mt-0.5 text-[8px]">
                    {slot.accessCount}×
                  </p>
                </>
              ) : (
                <p className="text-subtle text-[9px]">empty</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Hit rate" value={`${hitRate}%`} highlight />
          <MiniStat label="Evictions" value={state.evictions} />
          <MiniStat label="Hits" value={state.hits} />
          <MiniStat label="Misses" value={state.misses} />
        </div>

        {/* Log */}
        <div className="border-border bg-surface rounded-xl border p-4">
          <p className="text-subtle mb-2 text-[10px] font-medium tracking-widest uppercase">
            Access Log
          </p>
          <div className="space-y-1">
            {state.log.map((entry) => (
              <div key={entry.id} className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold",
                    entry.hit
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400",
                  )}
                >
                  {entry.hit ? "HIT" : "MISS"}
                </span>
                <span className="text-muted truncate font-mono text-[10px]">
                  {entry.key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Config */}
      <div className="border-border bg-surface space-y-3 rounded-xl border p-4">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Configuration
        </p>
        <RangeControl
          label="Cache capacity"
          value={capacity}
          min={2}
          max={12}
          unit="slots"
          onChange={setCapacity}
        />
        <RangeControl
          label="TTL"
          value={ttlSeconds}
          min={2}
          max={30}
          unit="s"
          onChange={setTtlSeconds}
        />
        <div className="flex items-center gap-3">
          <span className="text-muted w-28 text-xs">Access pattern</span>
          <div className="flex gap-2">
            {(["skewed", "uniform"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDistribution(d)}
                className={cn(
                  "focus-visible:ring-accent rounded px-2.5 py-1 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  distribution === d
                    ? "bg-foreground text-background"
                    : "bg-surface-raised text-muted hover:text-foreground",
                )}
              >
                {d === "skewed" ? "Skewed (hot keys)" : "Uniform"}
              </button>
            ))}
          </div>
        </div>
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
        "border-border bg-surface rounded-lg border p-3",
        highlight && "border-accent/20",
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
