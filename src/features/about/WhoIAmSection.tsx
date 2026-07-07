import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";

/**
 * Personal narrative — written using only verified information.
 * Avoids resume-speak. Tells a story, not a list.
 */
export function WhoIAmSection() {
  return (
    <section
      aria-labelledby="who-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Identity"
            title="Who I Am"
            id="who-heading"
          />
        </FadeInSection>

        <FadeInSection delay={0.05} className="max-w-2xl space-y-5">
          <p className="text-base leading-8 text-muted">
            I&apos;m a final-year Computer Science student at{" "}
            <span className="font-semibold text-foreground">
              Oxford College of Engineering
            </span>{" "}
            in Bengaluru. Most of my energy goes into building systems that
            handle real-world complexity — the kind of problems where
            correctness and performance aren&apos;t optional.
          </p>

          <p className="text-base leading-8 text-muted">
            My interests pull in several directions simultaneously:{" "}
            <span className="font-medium text-foreground">AI</span> and
            machine learning (building things that actually work in
            production, not demos),{" "}
            <span className="font-medium text-foreground">
              distributed systems
            </span>{" "}
            (what happens when a single machine isn&apos;t enough), and{" "}
            <span className="font-medium text-foreground">
              developer experience
            </span>{" "}
            (the craft of making systems easy for the engineers who come after
            you). I care deeply about open source, startups, and community
            leadership — the intersection of technical and human systems.
          </p>

          <p className="text-base leading-8 text-muted">
            I&apos;ve co-founded a startup, led a college technical chapter,
            served as a campus ambassador, and competed in hackathons —
            finishing as a finalist at Hacknovate and runner-up at BrinHack.
            These experiences didn&apos;t just add lines to a resume. They
            taught me how to ship under pressure, communicate clearly, and
            value the people who use what I build.
          </p>
        </FadeInSection>
      </Container>
    </section>
  );
}
