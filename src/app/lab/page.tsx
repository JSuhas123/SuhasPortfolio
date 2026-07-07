import { Container } from "@/components/shared/Container";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { getAllSimulations } from "@/data/lab/index";
import { LabGrid } from "@/features/lab/LabGrid";
import { createPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata(
  "Engineering Lab",
  "Interactive visualizations of distributed systems, algorithms, and backend concepts.",
  "/lab",
);

export default function LabPage() {
  const simulations = getAllSimulations();

  return (
    <PageWrapper>
      <Container className="py-12 md:py-16">
        {/* Hero */}
        <div className="mb-12 max-w-2xl">
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">
            Engineering Lab
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Systems, visualised.
          </h1>
          <p className="text-muted mt-4 text-base leading-relaxed">
            Interactive simulations of the distributed systems, algorithms, and
            engineering patterns that power production software at scale. Each
            simulation teaches a concept through direct manipulation — adjust
            parameters, observe effects, build intuition.
          </p>
          <div className="text-muted mt-5 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden
              />
              Beginner — foundational concepts
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full bg-amber-500"
                aria-hidden
              />
              Intermediate — production patterns
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full bg-red-500"
                aria-hidden
              />
              Advanced — complex systems
            </span>
          </div>
        </div>

        {/* Simulation grid */}
        <LabGrid simulations={simulations} />
      </Container>
    </PageWrapper>
  );
}
