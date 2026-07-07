import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

interface SectionAction {
  readonly label: string;
  readonly href: string;
}

interface SectionHeaderProps {
  readonly label: string;
  readonly title: string;
  readonly description?: string | undefined;
  readonly action?: SectionAction | undefined;
  /** id applied to the h2 for aria-labelledby on the parent section */
  readonly id?: string | undefined;
}

/**
 * Consistent section header used across all homepage sections.
 * label   — small ALL CAPS category marker
 * title   — H2 section heading
 * action  — optional "View all" link (right-aligned on desktop)
 */
export function SectionHeader({
  label,
  title,
  description,
  action,
  id,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="text-subtle font-mono text-xs tracking-[0.18em] uppercase">
          {label}
        </p>
        <h2
          id={id}
          className="text-foreground mt-2 text-2xl font-bold tracking-tight md:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="text-muted mt-2 max-w-xl text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href as Route}
          className="text-muted hover:text-foreground focus-visible:ring-accent flex shrink-0 items-center gap-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}
