import type { SimulationDef } from "@/data/lab/types";
import { LabCard } from "./LabCard";

interface LabGridProps {
  readonly simulations: readonly SimulationDef[];
}

export function LabGrid({ simulations }: LabGridProps) {
  if (simulations.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted">No simulations found.</p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {simulations.map((sim) => (
        <LabCard key={sim.slug} simulation={sim} />
      ))}
    </div>
  );
}
