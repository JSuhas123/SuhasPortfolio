import type { ProjectData } from "@/data/projects/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  readonly projects: readonly ProjectData[];
}

/**
 * Projects listing grid.
 * Featured projects always appear first.
 * Architecture is filter/search-ready — pass a pre-filtered array.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted">
        No projects found.
      </p>
    );
  }

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-4">
      {featured.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
