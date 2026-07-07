import { Container } from "@/components/shared/Container";
import { ProjectContent } from "@/features/projects/ProjectContent";
import { ProjectHero } from "@/features/projects/ProjectHero";
import { ProjectNavigation } from "@/features/projects/ProjectNavigation";
import { ProjectProgress } from "@/features/projects/ProjectProgress";
import {
  ProjectTableOfContents,
  type TocSection,
} from "@/features/projects/ProjectTableOfContents";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects";
import { createPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectSlugPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

/** Table of contents — matches section IDs in ProjectContent */
const TOC_SECTIONS: readonly TocSection[] = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "architecture", label: "Architecture" },
  { id: "tech-stack", label: "Technology Stack" },
  { id: "decisions", label: "Engineering Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "implementation", label: "Implementation" },
  { id: "metrics", label: "Performance Metrics" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "improvements", label: "Future Improvements" },
];

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return createPageMetadata(
    project.title,
    project.tagline,
    `/projects/${slug}`,
  );
}

export default async function ProjectSlugPage({
  params,
}: ProjectSlugPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      {/* Fixed reading progress bar (client) */}
      <ProjectProgress />

      {/* Full-width hero */}
      <ProjectHero project={project} />

      {/* Two-column layout: sticky TOC (lg+) + scrollable content */}
      <Container className="py-10 md:py-14">
        <div className="flex gap-12">
          {/* Sticky ToC — hidden below lg */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <ProjectTableOfContents sections={TOC_SECTIONS} />
          </aside>

          {/* Content — max readable width */}
          <div className="min-w-0 flex-1" style={{ maxWidth: "680px" }}>
            <ProjectContent project={project} />
          </div>
        </div>
      </Container>

      {/* Previous / Next navigation */}
      <ProjectNavigation prev={prev} next={next} />
    </>
  );
}
