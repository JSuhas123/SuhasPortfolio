import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";

interface FocusArea {
  readonly title: string;
  readonly description: string;
}

const FOCUS_AREAS: readonly FocusArea[] = [
  {
    title: "Modern Web",
    description:
      "Next.js 15 App Router, React Server Components, streaming, and the shift toward server-first web architecture. Understanding what the new model enables — not just how to use it.",
  },
  {
    title: "Distributed Systems",
    description:
      "Event streaming (Kafka), consensus algorithms, consistency models, and building systems that work correctly at scale. The theory and the production reality.",
  },
  {
    title: "AI Applications",
    description:
      "LLM integration, RAG pipelines, AI agents, and the engineering behind making AI reliable in production — not just demos. Practical AI, not hype.",
  },
  {
    title: "Developer Tools",
    description:
      "CLIs, build systems, linting, type safety at scale, and the craft of making developer experience a competitive advantage. DX is UX for engineers.",
  },
  {
    title: "Scalable Architectures",
    description:
      "System design at scale: caching strategies, database sharding, load balancing, and the trade-offs that separate working prototypes from production systems.",
  },
];

export function CurrentFocusSection() {
  return (
    <section
      aria-labelledby="focus-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Now"
            title="Current Focus"
            description="The areas I'm actively exploring, building in, and thinking about."
            id="focus-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOCUS_AREAS.map((area, i) => (
            <FadeInSection key={area.title} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-foreground">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
