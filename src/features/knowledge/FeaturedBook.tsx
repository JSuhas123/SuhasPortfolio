import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";
import { DISTRIBUTED_SYSTEMS_BOOK } from "@/data/knowledge/book";
import { FadeInSection } from "@/features/home/FadeInSection";
import { BookSceneLoader } from "@/features/knowledge/BookSceneLoader";
import { BookOpen, Clock, FileText, Layers } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

/**
 * Featured book showcase: 3D book (left) + metadata (right).
 */
export function FeaturedBook() {
  const book = DISTRIBUTED_SYSTEMS_BOOK;
  const available = book.chapters.filter(
    (c) => c.status !== "coming-soon",
  ).length;

  return (
    <section
      aria-labelledby="featured-book-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <p className="text-subtle mb-6 font-mono text-xs tracking-[0.2em] uppercase">
            Featured Book
          </p>
        </FadeInSection>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* 3D book canvas */}
          <FadeInSection className="flex-shrink-0 lg:w-80">
            <div
              className="mx-auto aspect-[3/4] w-64 lg:w-full"
              aria-hidden="true"
            >
              <BookSceneLoader />
            </div>
          </FadeInSection>

          {/* Book metadata */}
          <FadeInSection delay={0.08} className="flex-1">
            <div className="space-y-6">
              {/* Status */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                  Writing in Progress
                </span>
                <Badge variant="default">{book.edition}</Badge>
              </div>

              {/* Title */}
              <div>
                <h2
                  id="featured-book-heading"
                  className="text-foreground text-3xl font-bold tracking-tight md:text-4xl"
                >
                  {book.title}
                </h2>
                <p className="text-muted mt-1 text-lg">{book.subtitle}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  {
                    icon: Layers,
                    label: "Chapters",
                    value: String(book.chapterCount),
                  },
                  {
                    icon: FileText,
                    label: "Est. pages",
                    value: `~${book.estimatedPages}`,
                  },
                  {
                    icon: Clock,
                    label: "Reading hrs",
                    value: `${book.estimatedReadingHours}h`,
                  },
                  {
                    icon: BookOpen,
                    label: "Preview",
                    value: `${available} chapters`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="border-border bg-surface rounded-lg border p-3"
                  >
                    <Icon className="text-subtle mb-1 h-4 w-4" aria-hidden />
                    <p className="text-foreground text-base font-bold">
                      {value}
                    </p>
                    <p className="text-subtle text-[10px]">{label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-muted text-sm leading-7">{book.description}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={"/book/distributed-systems" as Route}
                  className="bg-foreground text-background focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <BookOpen className="h-4 w-4" aria-hidden />
                  Read Preview
                </Link>
                <Link
                  href={"/book/distributed-systems" as Route}
                  className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <Layers className="h-4 w-4" aria-hidden />
                  View Chapters
                </Link>
                <button
                  type="button"
                  disabled
                  className="border-border text-subtle inline-flex items-center gap-2 rounded-lg border border-dashed px-5 py-2.5 text-sm font-medium"
                  title="Available when the book is complete"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  Download Sample
                  <span className="text-[10px]">(soon)</span>
                </button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </Container>
    </section>
  );
}
