import { Container } from "@/components/shared/Container";
import { getAllSimulations } from "@/data/lab/index";
import { LabCard } from "@/features/lab/LabCard";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";

const PREVIEW_SLUGS = [
  "airport-scheduling",
  "load-balancer",
  "rate-limiter",
  "distributed-cache",
] as const;

/**
 * Engineering Lab preview — four simulation cards linking to /lab.
 * Simulations are selected by slug to ensure a curated set is shown.
 */
export function LabPreviewSection() {
  const allSims = getAllSimulations();
  const previewSims = PREVIEW_SLUGS.map((slug) =>
    allSims.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <section
      aria-labelledby="lab-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Engineering Lab"
            title="Interactive System Simulations"
            description="Visualise distributed systems, algorithms, and engineering patterns through direct manipulation. Adjust parameters, observe effects, build intuition."
            action={{ label: "Explore the Lab", href: "/lab" }}
            id="lab-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewSims.map((sim, i) => (
            <FadeInSection key={sim.slug} delay={i * 0.07}>
              <LabCard simulation={sim} />
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
