import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllSimulationSlugs, getSimulationBySlug } from "@/data/lab/index";
import { SimulationSection } from "@/features/lab/engine/SimulationSection";
import { CodeBlock } from "@/features/projects/components/CodeBlock";
import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";
import { createPageMetadata } from "@/utils/seo";

interface LabSlugPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateStaticParams() {
  return getAllSimulationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LabSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sim = getSimulationBySlug(slug);
  if (!sim) return { title: "Simulation Not Found" };
  return createPageMetadata(sim.title, sim.tagline, `/lab/${slug}`);
}

const DIFFICULTY_BADGE = {
  beginner: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:text-emerald-400",
  intermediate: "bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:text-amber-400",
  advanced: "bg-red-500/10 text-red-700 border border-red-500/20 dark:text-red-400",
} as const;

const CATEGORY_LABEL: Record<string, string> = {
  networking: "Networking",
  "distributed-systems": "Distributed Systems",
  backend: "Backend",
  databases: "Databases",
  caching: "Caching",
  "api-design": "API Design",
  algorithms: "Algorithms",
};

export default async function LabSlugPage({ params }: LabSlugPageProps) {
  const { slug } = await params;
  const sim = getSimulationBySlug(slug);
  if (!sim) notFound();

  return (
    <div>
      {/* Back navigation */}
      <div className="border-b border-border bg-surface">
        <Container>
          <div className="flex items-center gap-3 py-3">
            <Link
              href="/lab"
              className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden />
              Engineering Lab
            </Link>
            <span className="text-border">/</span>
            <span className="text-xs text-foreground">{sim.title}</span>
          </div>
        </Container>
      </div>

      <Container className="py-10 md:py-14">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_BADGE[sim.difficulty]}`}
            >
              {sim.difficulty}
            </span>
            <span className="text-xs text-subtle">
              {CATEGORY_LABEL[sim.category] ?? sim.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-subtle">
              <Clock className="h-3 w-3" aria-hidden />
              {sim.estimatedMinutes} min
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {sim.title}
          </h1>
          <p className="mt-2 text-base text-muted">{sim.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {sim.tags.map((tag) => (
              <Badge key={tag} variant="tech">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-10">
          {/* Main: simulation + controls */}
          <div className="min-w-0 flex-1">
            <SimulationSection slug={slug} />
          </div>
        </div>

        {/* Educational panel — server-rendered */}
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            How it works
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <EducationCard title="The Problem" content={sim.problem} />
            <EducationCard title="Real-World Use" content={sim.realWorldUse} />
            <EducationCard title="How It Works" content={sim.howItWorks} />
            <EducationCard title="Tradeoffs" content={sim.tradeoffs} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <EducationCard title="When to Use" content={sim.whenToUse} accent />
            <EducationCard title="When NOT to Use" content={sim.whenNotToUse} warn />
          </div>

          {/* Related concepts */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
              Related Concepts
            </p>
            <div className="flex flex-wrap gap-2">
              {sim.relatedConcepts.map((concept) => (
                <Badge key={concept} variant="skill">{concept}</Badge>
              ))}
            </div>
          </div>

          {/* Code example — async Shiki rendering */}
          <div className="mt-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-subtle">
              Implementation
            </p>
            <p className="mb-4 text-sm text-muted">{sim.codeExample.description}</p>
            <CodeBlock
              code={sim.codeExample.code}
              language={sim.codeExample.language}
              filename={sim.codeExample.filename}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

function EducationCard({
  title,
  content,
  accent,
  warn,
}: {
  title: string;
  content: string;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-emerald-500/20 bg-emerald-500/5"
          : warn
            ? "border-amber-500/20 bg-amber-500/5"
            : "border-border bg-surface"
      }`}
    >
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
          accent
            ? "text-emerald-600 dark:text-emerald-400"
            : warn
              ? "text-amber-600 dark:text-amber-400"
              : "text-foreground"
        }`}
      >
        {title}
      </p>
      <p className="text-sm leading-relaxed text-muted">{content}</p>
    </div>
  );
}
