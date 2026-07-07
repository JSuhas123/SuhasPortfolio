import type { ProjectMetric } from "@/data/projects/types";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  readonly metric: ProjectMetric;
  readonly className?: string | undefined;
}

/**
 * Displays a single engineering metric with label, value, and optional
 * description. Highlighted metrics receive a slightly elevated treatment.
 */
export function MetricCard({ metric, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-xl border p-5",
        metric.highlighted && "border-accent/20 bg-accent/5",
        className,
      )}
    >
      <p className="text-subtle text-xs font-medium tracking-widest uppercase">
        {metric.label}
      </p>
      <p
        className={cn(
          "mt-2 text-3xl font-bold tracking-tight",
          metric.highlighted ? "text-foreground" : "text-foreground",
        )}
      >
        {metric.value}
        {metric.unit && (
          <span className="text-muted ml-1 text-base font-normal">
            {metric.unit}
          </span>
        )}
      </p>
      {metric.description && (
        <p className="text-muted mt-1.5 text-xs leading-relaxed">
          {metric.description}
        </p>
      )}
    </div>
  );
}
