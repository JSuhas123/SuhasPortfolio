import type { ProjectMetric } from "@/data/projects/types";
import { MetricCard } from "./MetricCard";

interface MetricsGridProps {
  readonly metrics: readonly ProjectMetric[];
}

/**
 * Responsive grid of MetricCards.
 * Highlighted metrics render slightly larger on desktop.
 */
export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
