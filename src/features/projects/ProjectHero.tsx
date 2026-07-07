import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";
import type { ProjectData } from "@/data/projects/types";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface ProjectHeroProps {
  readonly project: ProjectData;
}

const COMPLEXITY_LABEL: Record<string, string> = {
  medium: "Medium Complexity",
  high: "High Complexity",
  critical: "Mission Critical",
};

/**
 * Full-width project hero section with:
 * title, tagline, status/complexity badges, timeline, and top-line metrics.
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  const githubLink = project.links.find((l) => l.type === "github");
  const demoLink = project.links.find((l) => l.type === "demo");

  return (
    <section className="border-border bg-surface border-b py-12 md:py-16">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="text-subtle flex items-center gap-2 text-xs">
            <li>
              <Link
                href="/projects"
                className="hover:text-foreground transition-colors"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden>
              <span>/</span>
            </li>
            <li className="text-foreground">{project.title}</li>
          </ol>
        </nav>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
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
          <Badge variant="default">
            {COMPLEXITY_LABEL[project.complexity] ?? project.complexity}
          </Badge>
          {project.featured && <Badge variant="featured">Featured</Badge>}
        </div>

        {/* Title */}
        <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        <p className="text-muted mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
          {project.tagline}
        </p>

        {/* Meta row */}
        <div className="text-subtle mt-4 flex flex-wrap items-center gap-4 text-xs">
          <span>{project.timeline}</span>
          <span aria-hidden>·</span>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="tech">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* External links */}
        {(githubLink ?? demoLink) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <Github className="h-4 w-4" aria-hidden />
                {githubLink.label}
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background focus-visible:ring-accent inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                {demoLink.label}
              </a>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
