import { Container } from "@/components/shared/Container";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";

/**
 * Quick Introduction section.
 * Three focused paragraphs: identity, what I build, engineering philosophy.
 */
export function IntroSection() {
  return (
    <section aria-labelledby="intro-heading" className="py-16 md:py-24">
      <Container>
        <FadeInSection>
          <SectionHeader
            label="About"
            title="Engineering is a thinking sport."
            id="intro-heading"
          />
        </FadeInSection>

        <FadeInSection delay={0.05} className="max-w-2xl space-y-5">
          <p className="text-muted text-base leading-8">
            I&apos;m{" "}
            <span className="text-foreground font-semibold">J Suhas</span> — a
            Staff Frontend Engineer with a deep interest in distributed systems,
            performance engineering, and building software that handles
            real-world complexity. My work lives at the intersection of{" "}
            <em className="text-foreground font-medium not-italic">
              frontend craft
            </em>{" "}
            and{" "}
            <em className="text-foreground font-medium not-italic">
              systems thinking
            </em>
            .
          </p>

          <p className="text-muted text-base leading-8">
            Most of my recent work has involved systems that process large
            volumes of data under time constraints — an AI intelligence platform
            deployed across{" "}
            <span className="text-foreground font-medium">
              12 law enforcement agencies
            </span>
            , and a constraint-solver-based airport scheduling engine that
            reduced gate conflicts by{" "}
            <span className="text-foreground font-medium">94%</span>. I&apos;m
            drawn to problems where engineering quality directly determines
            whether the product works at all.
          </p>

          <p className="text-muted text-base leading-8">
            I believe excellent engineering is invisible to users and obvious to
            the engineers who come after. I care about correctness,
            observability, and the reasoning behind every architectural decision
            — which is why I document my work the way I do.
          </p>
        </FadeInSection>
      </Container>
    </section>
  );
}
