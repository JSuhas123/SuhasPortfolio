import { Container } from "@/components/shared/Container";
import { PHILOSOPHY_CARDS } from "@/data/about/philosophy";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import type { LucideIcon } from "lucide-react";
import { BookOpen, BrainCircuit, Eye, Layers, Users, Zap } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- LucideIcon record indexed by string key
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Zap,
  Eye,
  Layers,
  BookOpen,
  BrainCircuit,
};

export function PhilosophySection() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Principles"
            title="Engineering Philosophy"
            id="philosophy-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHILOSOPHY_CARDS.map((card, i) => {
            const Icon = ICON_MAP[card.icon] ?? Layers;
            return (
              <FadeInSection key={card.title} delay={i * 0.05}>
                <div className="border-border bg-surface rounded-xl border p-5">
                  <div className="bg-surface-raised text-foreground mb-3 flex h-9 w-9 items-center justify-center rounded-lg">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <h3 className="text-foreground text-sm font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
