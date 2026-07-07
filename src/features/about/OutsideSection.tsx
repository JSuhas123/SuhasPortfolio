import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";

interface OutsideItem {
  readonly title: string;
  readonly description: string;
}

const OUTSIDE_ITEMS: readonly OutsideItem[] = [
  {
    title: "Hackathons",
    description:
      "Regular participant in national hackathons — both as a competitor (Hacknovate Finalist, BrinHack Runner-up) and as an organiser. The time constraint forces product thinking.",
  },
  {
    title: "Community & Events",
    description:
      "Active in the Bengaluru tech community. Attend engineering meetups, developer conferences, and university events. Built genuine relationships with engineers across domains.",
  },
  {
    title: "Open Source",
    description:
      "Ongoing contributor to open source projects. Code review, feature work, documentation. The open source community taught me more about collaborative engineering than any classroom.",
  },
  {
    title: "Continuous Learning",
    description:
      "Reading papers, following engineering blogs (Stripe, Cloudflare, Linear, Vercel), and working through technical books. Deliberate about learning, not just consuming.",
  },
];

/**
 * Outside engineering — community, hackathons, learning, life.
 */
export function OutsideSection() {
  return (
    <section
      aria-labelledby="outside-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Beyond Code"
            title="Outside Engineering"
            id="outside-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2">
          {OUTSIDE_ITEMS.map((item, i) => (
            <FadeInSection key={item.title} delay={i * 0.05}>
              <div className="border-border bg-surface rounded-xl border p-5">
                <h3 className="text-foreground text-sm font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
