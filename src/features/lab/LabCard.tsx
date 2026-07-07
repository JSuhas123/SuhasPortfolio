import { Badge } from "@/components/ui/Badge";
import type { SimulationDef } from "@/data/lab/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

interface LabCardProps {
  readonly simulation: SimulationDef;
}

const DIFFICULTY_BADGE: Record<SimulationDef["difficulty"], string> = {
  beginner:
    "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:text-emerald-400",
  intermediate:
    "bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:text-amber-400",
  advanced:
    "bg-red-500/10 text-red-700 border border-red-500/20 dark:text-red-400",
};

const CATEGORY_LABEL: Record<SimulationDef["category"], string> = {
  networking: "Networking",
  "distributed-systems": "Distributed Systems",
  backend: "Backend",
  databases: "Databases",
  caching: "Caching",
  "api-design": "API Design",
  algorithms: "Algorithms",
};

export function LabCard({ simulation: sim }: LabCardProps) {
  const href = `/lab/${sim.slug}` as Route;

  return (
    <Link
      href={href}
      className={cn(
        "group border-border bg-surface block rounded-xl border p-5",
        "transition-all duration-200",
        "hover:border-border-subtle hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                DIFFICULTY_BADGE[sim.difficulty],
              )}
            >
              {sim.difficulty}
            </span>
            <span className="text-subtle text-[10px]">
              {CATEGORY_LABEL[sim.category]}
            </span>
          </div>
          <h3 className="text-foreground group-hover:text-accent mt-1.5 text-sm font-semibold tracking-tight transition-colors">
            {sim.title}
          </h3>
          <p className="text-muted mt-1 text-xs leading-relaxed">
            {sim.tagline}
          </p>
        </div>
        <ArrowUpRight
          className="text-subtle mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {sim.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="tech">
              {tag}
            </Badge>
          ))}
        </div>
        <span className="text-subtle flex items-center gap-1 text-[10px]">
          <Clock className="h-3 w-3" aria-hidden />
          {sim.estimatedMinutes} min
        </span>
      </div>
    </Link>
  );
}
