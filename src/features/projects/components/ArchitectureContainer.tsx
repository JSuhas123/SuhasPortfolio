import type { DiagramType } from "@/data/projects/types";
import { cn } from "@/lib/utils";

interface ArchitectureContainerProps {
  readonly diagramType?: DiagramType | undefined;
  readonly caption?: string | undefined;
  readonly className?: string | undefined;
}

const DIAGRAM_LABELS: Record<DiagramType, string> = {
  flow: "Flow Diagram",
  network: "Network Diagram",
  sequence: "Sequence Diagram",
  c4: "C4 Architecture Diagram",
  er: "Entity-Relationship Diagram",
};

/**
 * Reserved container for architecture visualizations.
 * Currently renders an elegant placeholder indicating what diagram type
 * will be placed here (React Flow, Three.js, or static image).
 *
 * Future: replace the placeholder content with the actual diagram component
 * without changing the container or surrounding layout.
 */
export function ArchitectureContainer({
  diagramType,
  caption,
  className,
}: ArchitectureContainerProps) {
  const label = diagramType
    ? DIAGRAM_LABELS[diagramType]
    : "Architecture Diagram";

  return (
    <figure className={cn("my-2", className)}>
      <div className="border-border bg-surface-raised/50 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed px-8 py-12 text-center">
        <div className="border-border bg-surface mb-3 flex h-10 w-10 items-center justify-center rounded-lg border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-subtle h-5 w-5"
            aria-hidden
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <line x1="6.5" y1="10" x2="6.5" y2="14" />
            <line x1="17.5" y1="10" x2="17.5" y2="14" />
            <line x1="10" y1="6.5" x2="14" y2="6.5" />
          </svg>
        </div>
        <p className="text-foreground text-sm font-medium">{label}</p>
        <p className="text-subtle mt-1 text-xs">
          Interactive diagram · Coming in a future update
        </p>
      </div>
      {caption && (
        <figcaption className="text-subtle mt-3 text-center text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
