import type { TechCategory, TechItem } from "@/data/projects/types";
import { cn } from "@/lib/utils";

interface TechStackProps {
  readonly techStack: readonly TechItem[];
}

const CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Data",
  infrastructure: "Infrastructure",
  ml: "ML / AI",
  tooling: "Tooling",
};

const CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "backend",
  "database",
  "infrastructure",
  "ml",
  "tooling",
];

/**
 * Displays the technology stack grouped by category.
 * Each item shows the name and the reason it was chosen on hover/expansion.
 */
export function TechStack({ techStack }: TechStackProps) {
  const grouped = new Map<TechCategory, TechItem[]>();

  for (const item of techStack) {
    const existing = grouped.get(item.category);
    if (existing) {
      existing.push(item);
    } else {
      grouped.set(item.category, [item]);
    }
  }

  const presentCategories = CATEGORY_ORDER.filter((cat) => grouped.has(cat));

  return (
    <div className="space-y-6">
      {presentCategories.map((category) => {
        const items = grouped.get(category);
        if (!items) return null;
        return (
          <div key={category}>
            <p className="text-subtle mb-3 text-xs font-medium tracking-widest uppercase">
              {CATEGORY_LABELS[category]}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <TechBadge key={item.name} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TechBadge({ item }: { readonly item: TechItem }) {
  return (
    <div className="group relative">
      <span
        className={cn(
          "border-border inline-flex cursor-default items-center rounded-full border",
          "bg-surface-raised text-foreground px-3 py-1 font-mono text-xs",
          "hover:border-accent/30 hover:bg-accent/5 transition-colors",
        )}
      >
        {item.name}
      </span>
      {/* Reason tooltip */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-64",
          "border-border bg-surface rounded-lg border p-3 shadow-md",
          "opacity-0 transition-opacity duration-150 group-hover:opacity-100",
        )}
        role="tooltip"
      >
        <p className="text-muted text-xs leading-relaxed">{item.reason}</p>
      </div>
    </div>
  );
}
