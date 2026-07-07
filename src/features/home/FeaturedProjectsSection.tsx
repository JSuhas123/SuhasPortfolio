import { Container } from "@/components/shared/Container";
import { getFeaturedProjects } from "@/data/projects/index";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";

/**
 * Showcases the three featured projects using the existing ProjectCard.
 * Data is fetched server-side from the project registry.
 */
export function FeaturedProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <section
      aria-labelledby="projects-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Work"
            title="Selected Projects"
            description="Systems built in production. Each one documented with real engineering decisions, measured outcomes, and honest lessons."
            action={{ label: "View all projects", href: "/projects" }}
            id="projects-heading"
          />
        </FadeInSection>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <FadeInSection key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
