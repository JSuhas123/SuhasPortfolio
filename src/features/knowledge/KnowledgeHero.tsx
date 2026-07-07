import { Container } from "@/components/shared/Container";

/**
 * Knowledge Hub landing page hero.
 * Background: subtle CSS-animated dot grid (no JS, reduced-motion safe).
 */
export function KnowledgeHero() {
  return (
    <section
      aria-labelledby="knowledge-hero-heading"
      className="border-border bg-surface relative overflow-hidden border-b py-20 md:py-28"
    >
      {/* Animated dot grid background */}
      <div
        aria-hidden
        className="animate-grid-drift pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(55% 0.2 264 / 0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px",
          animation: "grid-drift 28s linear infinite",
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">
            Knowledge Hub
          </p>

          <h1
            id="knowledge-hero-heading"
            className="text-foreground mt-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Engineering Writing
          </h1>

          <p className="text-muted mt-5 max-w-2xl text-lg leading-8 md:text-xl">
            A collection of long-form technical content — systems thinking,
            distributed architectures, and the engineering principles behind
            building software that scales.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-8">
            {[
              { label: "Book in progress", value: "1" },
              { label: "Published articles", value: "3+" },
              { label: "Reading hours", value: "22+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-foreground text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-subtle text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
