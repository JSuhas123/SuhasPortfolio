"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export interface TocSection {
  readonly id: string;
  readonly label: string;
}

interface ProjectTableOfContentsProps {
  readonly sections: readonly TocSection[];
}

/**
 * Sticky table of contents for project detail pages.
 * Tracks the currently visible section using IntersectionObserver.
 * Visible only on lg+ screens; hidden on smaller viewports.
 */
export function ProjectTableOfContents({
  sections,
}: ProjectTableOfContentsProps) {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto"
    >
      <p className="text-subtle mb-3 text-xs font-medium tracking-widest uppercase">
        Contents
      </p>
      <ol className="space-y-0.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "block rounded-sm px-2 py-1.5 text-xs transition-colors",
                  "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
