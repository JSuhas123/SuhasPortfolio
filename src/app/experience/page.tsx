import { Container } from "@/components/shared/Container";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { WORK_EXPERIENCE } from "@/data/experience/companies";
import { CommunitySection } from "@/features/experience/CommunitySection";
import { CompanyCard } from "@/features/experience/CompanyCard";
import { ExperienceAchievements } from "@/features/experience/ExperienceAchievements";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { createPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata(
  "Experience — J Suhas",
  "Engineering experience at MindMatrix, CityX, and Surgewing. Hackathon finalist, campus ambassador, and open source contributor.",
  "/experience",
);

export default function ExperiencePage() {
  return (
    <PageWrapper>
      {/* Page header */}
      <div className="border-border bg-surface border-b py-12 md:py-16">
        <Container>
          <FadeInSection>
            <p className="text-subtle font-mono text-xs tracking-[0.18em] uppercase">
              Career
            </p>
            <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Experience
            </h1>
            <p className="text-muted mt-3 max-w-xl text-base leading-relaxed">
              Engineering internships, leadership roles, hackathon circuits, and
              community work — the full picture.
            </p>
          </FadeInSection>
        </Container>
      </div>

      {/* Work experience */}
      <section
        aria-labelledby="work-experience-heading"
        className="py-16 md:py-24"
      >
        <Container>
          <FadeInSection>
            <SectionHeader
              label="Work"
              title="Engineering Experience"
              id="work-experience-heading"
            />
          </FadeInSection>

          <div className="space-y-6">
            {WORK_EXPERIENCE.map((exp, i) => (
              <FadeInSection key={exp.company} delay={i * 0.06}>
                <CompanyCard experience={exp} />
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <ExperienceAchievements />

      {/* Certifications — reserved section */}
      <section
        aria-labelledby="certifications-heading"
        className="border-border border-t py-16 md:py-20"
      >
        <Container>
          <FadeInSection>
            <SectionHeader
              label="Credentials"
              title="Certifications"
              id="certifications-heading"
            />
          </FadeInSection>
          <FadeInSection delay={0.05}>
            <div className="border-border bg-surface/50 flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed px-8 py-10 text-center">
              <p className="text-foreground text-sm font-medium">
                Certifications
              </p>
              <p className="text-subtle mt-1 text-xs">
                Section reserved — will be populated with verified credentials
              </p>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Community */}
      <CommunitySection />
    </PageWrapper>
  );
}
