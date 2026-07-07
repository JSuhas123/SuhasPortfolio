import { Badge } from "@/components/ui/Badge";
import type { ProjectData } from "@/data/projects/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Calendar } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

interface ProjectCardProps {
  readonly project: ProjectData;
  readonly className?: string | undefined;
}

/**
 * Full-featured project card for the listing page.
 * Shows: title, tagline, tags, status, complexity, timeline, and top metrics.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const href = `/projects/${project.slug}` as Route;
  const topMetrics = project.metrics.filter((m) => m.highlighted).slice(0, 3);

  return (
    <Link
      href={href}
      className={cn(
        "group border-border bg-surface block rounded-xl border p-6",
        "transition-all duration-200",
        "hover:border-border-subtle hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-foreground group-hover:text-accent text-base font-semibold tracking-tight transition-colors">
              {project.title}
            </h2>
            {project.featured && <Badge variant="featured">Featured</Badge>}
          </div>
          <p className="text-muted mt-1.5 text-sm leading-relaxed">
            {project.tagline}
          </p>
        </div>
        <ArrowUpRight
          className="text-subtle mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>

      {/* Key metrics — highlighted only */}
      {topMetrics.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {topMetrics.map((m) => (
            <div
              key={m.label}
              className="border-border bg-surface-raised rounded-lg border px-3 py-2"
            >
              <p className="text-foreground text-base font-bold tracking-tight">
                {m.value}
              </p>
              <p className="text-subtle mt-0.5 text-[10px]">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="tech">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-subtle flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3" aria-hidden />
            {project.timeline}
          </span>
          <Badge
            variant={
              project.status === "active"
                ? "active"
                : project.status === "completed"
                  ? "completed"
                  : "archived"
            }
          >
            {project.status}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
