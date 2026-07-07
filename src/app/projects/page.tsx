import { Container } from "@/components/shared/Container";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { ProjectGrid } from "@/features/projects/ProjectGrid";
import { getAllProjects } from "@/lib/projects";
import { createPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata(
  "Projects",
  "Engineering work: AI platforms, optimization systems, and developer tooling.",
  "/projects",
);

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageWrapper>
      <Container className="py-12 md:py-16">
        {/* Page header */}
        <div className="mb-10 max-w-xl">
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">
            Engineering Work
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Projects
          </h1>
          <p className="text-muted mt-3 text-base leading-relaxed">
            Systems built in production. Each one documented with real
            engineering decisions, measured outcomes, and honest lessons.
          </p>
        </div>

        {/* Project listing */}
        <ProjectGrid projects={projects} />
      </Container>
    </PageWrapper>
  );
}
