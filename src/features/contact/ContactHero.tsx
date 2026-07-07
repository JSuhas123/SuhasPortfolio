import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="border-border bg-surface border-b py-16 md:py-24"
    >
      <Container>
        <FadeInSection className="max-w-2xl">
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">
            Contact
          </p>
          <h1
            id="contact-hero-heading"
            className="text-foreground mt-3 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Let&apos;s Build Something{" "}
            <span className="text-accent">Meaningful</span> Together.
          </h1>
          <p className="text-muted mt-5 text-base leading-8">
            I&apos;m open to interesting engineering challenges — software
            engineering, AI applications, full-stack products, developer
            tooling, or startup work where the engineering quality actually
            matters. If you&apos;re building something real, I want to hear
            about it.
          </p>

          {/* Interest tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Software Engineering",
              "Full Stack",
              "AI / ML",
              "Developer Relations",
              "Startups",
              "Research",
            ].map((interest) => (
              <span
                key={interest}
                className="border-border bg-surface-raised text-muted inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </FadeInSection>
      </Container>
    </section>
  );
}
