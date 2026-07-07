import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";

interface TechGroup {
  readonly label: string;
  readonly items: readonly string[];
}

const TECH_GROUPS: readonly TechGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Python", "Java"],
  },
  {
    label: "AI / ML",
    items: ["OpenAI", "LangChain", "PyTorch", "TensorFlow", "OpenCV"],
  },
  {
    label: "Infrastructure",
    items: ["Redis", "MongoDB", "GitHub Actions", "Linux"],
  },
  {
    label: "System Design",
    items: ["Distributed Systems", "Caching", "WebSockets"],
  },
];

/**
 * Technologies grouped by domain — no ratings or progress bars.
 * Organised exactly as specified in the Sprint 6 requirements.
 */
export function TechEnjoySection() {
  return (
    <section
      aria-labelledby="tech-enjoy-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Tools"
            title="Technologies I Enjoy"
            id="tech-enjoy-heading"
          />
        </FadeInSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TECH_GROUPS.map((group, i) => (
            <FadeInSection key={group.label} delay={i * 0.04}>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
