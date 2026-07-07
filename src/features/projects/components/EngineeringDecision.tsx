"use client";

import type { EngineeringDecisionData } from "@/data/projects/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface EngineeringDecisionProps {
  readonly decision: EngineeringDecisionData;
  readonly index: number;
}

/**
 * Expandable engineering decision card.
 * Collapsed: shows the decision title.
 * Expanded: context, alternatives considered, rationale, tradeoffs, outcome.
 */
export function EngineeringDecision({
  decision,
  index,
}: EngineeringDecisionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-border bg-surface overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-start justify-between gap-4 px-5 py-4 text-left",
          "hover:bg-surface-raised focus-visible:ring-accent transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
        )}
      >
        <div className="flex items-start gap-3">
          <span className="bg-surface-raised text-subtle mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-xs">
            {index + 1}
          </span>
          <span className="text-foreground text-sm font-semibold">
            {decision.decision}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "text-subtle mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div className="border-border space-y-4 border-t px-5 pt-4 pb-5">
          <DecisionSection label="Context" content={decision.context} />

          <div>
            <p className="text-subtle mb-2 text-xs font-medium tracking-wider uppercase">
              Alternatives Considered
            </p>
            <ul className="space-y-1">
              {decision.alternatives.map((alt) => (
                <li
                  key={alt}
                  className="text-muted flex items-center gap-2 text-sm"
                >
                  <span
                    className="bg-border h-1 w-1 shrink-0 rounded-full"
                    aria-hidden
                  />
                  {alt}
                </li>
              ))}
            </ul>
          </div>

          <DecisionSection label="Rationale" content={decision.rationale} />
          <DecisionSection label="Tradeoffs" content={decision.tradeoffs} />

          <div>
            <p className="text-subtle mb-1 text-xs font-medium tracking-wider uppercase">
              Outcome
            </p>
            <p className="text-foreground text-sm leading-relaxed">
              {decision.outcome}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function DecisionSection({
  label,
  content,
}: {
  readonly label: string;
  readonly content: string;
}) {
  return (
    <div>
      <p className="text-subtle mb-1 text-xs font-medium tracking-wider uppercase">
        {label}
      </p>
      <p className="text-muted text-sm leading-relaxed">{content}</p>
    </div>
  );
}
