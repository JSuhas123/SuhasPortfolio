import { Container } from "@/components/shared/Container";
import { TECH_STACK } from "@/data/home/tech-stack";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";

/**
 * Technology stack organised by category.
 * Clean badge lists — no progress bars, no ratings.
 */
export function TechStackSection() {
  return (
    <section
      aria-labelledby="techstack-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Technology"
            title="Tools of the Trade"
            description="Technologies I work with regularly. Organised by domain, not rank."
            id="techstack-heading"
          />
        </FadeInSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TECH_STACK.map((category, i) => (
            <FadeInSection key={category.label} delay={i * 0.04}>
              <div>
                <p className="text-subtle mb-3 text-xs font-medium tracking-widest uppercase">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item.name}
                      className="border-border bg-surface-raised text-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs"
                    >
                      {item.name}
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
