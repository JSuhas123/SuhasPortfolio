import { Container } from "@/components/shared/Container";
import type { ProjectData } from "@/data/projects/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

interface ProjectNavigationProps {
  readonly prev: ProjectData | null;
  readonly next: ProjectData | null;
}

/**
 * Previous / Next project navigation footer.
 * Shown at the bottom of every project detail page.
 */
export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  return (
    <nav aria-label="Project navigation" className="border-border border-t">
      <Container>
        <div className="flex items-stretch gap-px py-8">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}` as Route}
              className="group hover:bg-surface-raised focus-visible:ring-accent flex flex-1 flex-col gap-1 rounded-xl p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="text-subtle flex items-center gap-1 text-xs">
                <ArrowLeft className="h-3 w-3" aria-hidden />
                Previous
              </span>
              <span className="text-foreground group-hover:text-accent text-sm font-medium transition-colors">
                {prev.title}
              </span>
              <span className="text-muted text-xs">{prev.tagline}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          <Link
            href="/projects"
            className="text-subtle hover:text-foreground focus-visible:ring-accent flex items-center px-4 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            All Projects
          </Link>

          {next ? (
            <Link
              href={`/projects/${next.slug}` as Route}
              className="group hover:bg-surface-raised focus-visible:ring-accent flex flex-1 flex-col items-end gap-1 rounded-xl p-4 text-right transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="text-subtle flex items-center gap-1 text-xs">
                Next
                <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
              <span className="text-foreground group-hover:text-accent text-sm font-medium transition-colors">
                {next.title}
              </span>
              <span className="text-muted text-xs">{next.tagline}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </Container>
    </nav>
  );
}
