"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { SimulationProps } from "../engine/SimulationSection";

interface Message {
  readonly id: string;
  readonly partition: number;
  readonly offset: number;
  readonly key: string;
  readonly value: string;
}

interface ConsumerGroup {
  readonly id: string;
  readonly name: string;
  // offsets[partition] = how many messages this group has consumed
  readonly offsets: readonly number[];
}

interface State {
  readonly messages: readonly Message[];
  readonly partitionOffsets: readonly number[]; // messages written per partition
  readonly consumerGroups: readonly ConsumerGroup[];
  readonly totalProduced: number;
}

function makeInitial(partitionCount: number, groupCount: number): State {
  return {
    messages: [],
    partitionOffsets: Array.from({ length: partitionCount }, () => 0),
    consumerGroups: Array.from({ length: groupCount }, (_, i) => ({
      id: String(i),
      name: `group-${String.fromCharCode(65 + i)}`,
      offsets: Array.from({ length: partitionCount }, () => 0),
    })),
    totalProduced: 0,
  };
}

const EVENT_TYPES = [
  "order.created",
  "order.paid",
  "user.signup",
  "payment.processed",
  "product.viewed",
  "cart.updated",
];
const CUSTOMERS = ["cust-001", "cust-002", "cust-003", "cust-004", "cust-005"];
let msgCounter = 0;

export function KafkaStreaming({ isPlaying, speed }: SimulationProps) {
  const [partitions, setPartitions] = useState(3);
  const [groupCount, setGroupCount] = useState(2);
  const [produceRate, setProduceRate] = useState(2);
  const [state, setState] = useState<State>(() => makeInitial(3, 2));
  const prevPartitions = useRef(partitions);
  const prevGroups = useRef(groupCount);

  // Reset when topology changes
  useEffect(() => {
    if (
      partitions !== prevPartitions.current ||
      groupCount !== prevGroups.current
    ) {
      setState(makeInitial(partitions, groupCount));
      prevPartitions.current = partitions;
      prevGroups.current = groupCount;
    }
  }, [partitions, groupCount]);

  useEffect(() => {
    if (!isPlaying) return;
    const tickMs = Math.max(100, Math.floor(1000 / (speed * produceRate)));

    const id = setInterval(() => {
      setState((prev) => {
        // Produce 1 message per tick
        const customer =
          CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)] ?? "cust-001";
        const eventType =
          EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)] ??
          "order.created";

        // Hash partition key (customer ID) to partition
        let hash = 0;
        for (let i = 0; i < customer.length; i++) {
          hash = (hash * 31 + (customer.charCodeAt(i) ?? 0)) & 0xffffffff;
        }
        const partition = Math.abs(hash) % prev.partitionOffsets.length;

        const currentOffset = prev.partitionOffsets[partition] ?? 0;
        const msg: Message = {
          id: String(++msgCounter),
          partition,
          offset: currentOffset,
          key: customer,
          value: eventType,
        };

        const partitionOffsets = prev.partitionOffsets.map((off, i) =>
          i === partition ? off + 1 : off,
        );

        // Each consumer group consumes from partitions (slower than produce = simulated lag)
        const consumerGroups = prev.consumerGroups.map((group) => {
          const newOffsets = group.offsets.map((off, i) => {
            const available = partitionOffsets[i] ?? 0;
            const lag = available - off;
            // Consume up to 1 message per tick per partition
            return lag > 0 ? off + 1 : off;
          });
          return { ...group, offsets: newOffsets };
        });

        // Keep only latest 24 messages visible
        const messages = [msg, ...prev.messages].slice(0, 24);

        return {
          messages,
          partitionOffsets,
          consumerGroups,
          totalProduced: prev.totalProduced + 1,
        };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [isPlaying, speed, produceRate]);

  const totalLag = state.consumerGroups.reduce(
    (total, group) =>
      total +
      group.offsets.reduce((sum, off, i) => {
        const avail = state.partitionOffsets[i] ?? 0;
        return sum + (avail - off);
      }, 0),
    0,
  );

  return (
    <div className="space-y-5">
      {/* Topology */}
      <div className="overflow-x-auto">
        <div className="min-w-[500px] space-y-4">
          {/* Producer → Topic */}
          <div className="flex items-center gap-3">
            <TopologyNode
              label="Producer"
              color="bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
            />
            <Arrow />
            <TopologyNode
              label="order-events"
              subtitle="topic"
              color="bg-surface border-border text-foreground"
              wide
            />
          </div>

          {/* Partitions */}
          <div className="flex items-start gap-3 pl-[88px]">
            <Arrow vertical />
            <div className="flex gap-2">
              {state.partitionOffsets.map((offset, i) => (
                <div
                  key={i}
                  className="border-border bg-surface min-w-[80px] rounded-lg border p-2"
                >
                  <p className="text-muted text-[10px] font-medium">
                    Partition {i}
                  </p>
                  <p className="text-foreground font-mono text-xs font-bold">
                    {offset} msgs
                  </p>
                  {/* Recent messages */}
                  <div className="mt-1 space-y-0.5">
                    {state.messages
                      .filter((m) => m.partition === i)
                      .slice(0, 3)
                      .map((m) => (
                        <div
                          key={m.id}
                          className="bg-accent/10 rounded px-1 py-0.5"
                        >
                          <p className="text-accent truncate font-mono text-[8px]">
                            @{m.offset} {m.key.slice(5)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consumer Groups */}
          <div className="flex items-start gap-3 pl-[88px]">
            <Arrow vertical />
            <div className="flex flex-col gap-2">
              {state.consumerGroups.map((group) => {
                const lag = group.offsets.reduce((sum, off, i) => {
                  const avail = state.partitionOffsets[i] ?? 0;
                  return sum + (avail - off);
                }, 0);
                return (
                  <div
                    key={group.id}
                    className="border-border bg-surface rounded-lg border p-2"
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-mono text-xs font-semibold">
                        {group.name}
                      </p>
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                          lag === 0
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                        )}
                      >
                        lag: {lag}
                      </span>
                    </div>
                    <div className="mt-1 flex gap-1">
                      {group.offsets.map((off, i) => (
                        <div key={i} className="text-center">
                          <p className="text-muted text-[8px]">P{i}</p>
                          <p className="text-foreground font-mono text-[10px]">
                            @{off}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <MiniStat label="Produced" value={state.totalProduced} />
        <MiniStat label="Partitions" value={partitions} />
        <MiniStat
          label="Total lag"
          value={totalLag}
          highlight={totalLag > 10}
        />
      </div>

      {/* Config */}
      <div className="border-border bg-surface space-y-3 rounded-xl border p-4">
        <p className="text-subtle text-xs font-medium tracking-widest uppercase">
          Configuration
        </p>
        <RangeControl
          label="Partitions"
          value={partitions}
          min={1}
          max={5}
          unit=""
          onChange={setPartitions}
        />
        <RangeControl
          label="Consumer groups"
          value={groupCount}
          min={1}
          max={3}
          unit=""
          onChange={setGroupCount}
        />
        <RangeControl
          label="Produce rate"
          value={produceRate}
          min={1}
          max={8}
          unit="msg/s"
          onChange={setProduceRate}
        />
      </div>
    </div>
  );
}

function TopologyNode({
  label,
  subtitle,
  color,
  wide,
}: {
  label: string;
  subtitle?: string;
  color: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-center",
        wide ? "min-w-[140px]" : "min-w-[80px]",
        color,
      )}
    >
      <p className="text-xs font-semibold">{label}</p>
      {subtitle && <p className="text-[9px] opacity-70">{subtitle}</p>}
    </div>
  );
}

function Arrow({ vertical }: { vertical?: boolean }) {
  return (
    <div
      className={cn(
        "text-subtle flex items-center justify-center",
        vertical ? "h-6 w-6 flex-col" : "w-6",
      )}
    >
      <span className="text-xs">{vertical ? "↓" : "→"}</span>
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
        highlight ? "border-amber-500/30" : "border-border",
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
      <label className="text-muted w-32 text-xs">{label}</label>
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
