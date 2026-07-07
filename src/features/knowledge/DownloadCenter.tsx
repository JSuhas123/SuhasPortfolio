import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Code2,
  Download,
  FileCode,
  FileDown,
  FileText,
  Presentation,
  Smartphone,
} from "lucide-react";

interface DownloadResource {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly format: string;
  readonly size: string;
  readonly description: string;
}

const RESOURCES: readonly DownloadResource[] = [
  {
    icon: FileText,
    title: "Complete Book",
    format: "PDF",
    size: "~12 MB",
    description: "Full text with all 18 chapters, diagrams, and exercises.",
  },
  {
    icon: BookOpen,
    title: "EPUB Edition",
    format: "EPUB",
    size: "~8 MB",
    description: "Formatted for e-readers and apps. Reflowable layout.",
  },
  {
    icon: Smartphone,
    title: "Kindle Edition",
    format: "MOBI",
    size: "~9 MB",
    description: "Optimised for Kindle devices and the Kindle app.",
  },
  {
    icon: FileDown,
    title: "Sample Chapter",
    format: "PDF",
    size: "~1 MB",
    description: 'Chapter 1: "Introduction to Distributed Systems" — free.',
  },
  {
    icon: Code2,
    title: "Companion Code",
    format: "Repository",
    size: "",
    description: "All code examples and exercises from the book on GitHub.",
  },
  {
    icon: Download,
    title: "Architecture Diagrams",
    format: "SVG / PDF",
    size: "~5 MB",
    description: "All system architecture diagrams in vector format.",
  },
  {
    icon: Presentation,
    title: "Slides & Exercises",
    format: "PDF",
    size: "~20 MB",
    description: "Teaching slides and chapter exercises for self-study.",
  },
  {
    icon: FileCode,
    title: "Cheat Sheets",
    format: "PDF",
    size: "~2 MB",
    description:
      "Quick reference cards for consistency models, algorithms, and patterns.",
  },
];

/**
 * Download centre — all resources shown as cards.
 * All downloads are placeholders until the book is published.
 */
export function DownloadCenter() {
  return (
    <section
      aria-labelledby="downloads-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Resources"
            title="Download Centre"
            description="All formats and companion materials will be available on publication."
            id="downloads-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((res, i) => {
            const Icon = res.icon;
            return (
              <FadeInSection key={res.title} delay={i * 0.04}>
                <div className="border-border bg-surface flex h-full flex-col rounded-xl border border-dashed p-5">
                  <div className="bg-surface-raised text-subtle mb-3 flex h-9 w-9 items-center justify-center rounded-lg">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-foreground text-sm font-semibold">
                    {res.title}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted font-mono text-[10px]">
                      {res.format}
                    </span>
                    {res.size && (
                      <>
                        <span className="text-subtle" aria-hidden>
                          ·
                        </span>
                        <span className="text-subtle text-[10px]">
                          {res.size}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-muted mt-2 flex-1 text-xs leading-relaxed">
                    {res.description}
                  </p>
                  <button
                    type="button"
                    disabled
                    aria-label={`${res.title} — coming soon`}
                    className="border-border text-subtle mt-4 rounded-md border px-3 py-1.5 text-xs"
                  >
                    Coming Soon
                  </button>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
