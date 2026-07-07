import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";
import { getBookBySlug } from "@/data/knowledge/book";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { DownloadCenter } from "@/features/knowledge/DownloadCenter";
import { TableOfContents } from "@/features/knowledge/TableOfContents";
import { createPageMetadata } from "@/utils/seo";
import { ArrowLeft, BookOpen, Clock, FileText, Layers } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BookPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "distributed-systems" }];
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book Not Found" };
  return createPageMetadata(
    `${book.title} — J Suhas`,
    book.description,
    `/book/${slug}`,
  );
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const available = book.chapters.filter(
    (c) => c.status !== "coming-soon",
  ).length;

  return (
    <>
      {/* Back link */}
      <div className="border-border bg-surface border-b">
        <Container>
          <div className="flex items-center gap-2 py-3">
            <Link
              href={"/knowledge" as unknown as Route}
              className="text-muted hover:text-foreground focus-visible:ring-accent flex items-center gap-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden />
              Knowledge Hub
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground text-xs">{book.title}</span>
          </div>
        </Container>
      </div>

      {/* Book hero */}
      <section className="border-border border-b py-14 md:py-20">
        <Container>
          <FadeInSection>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                Writing in Progress
              </span>
              <Badge variant="default">{book.edition}</Badge>
              <span className="text-subtle text-xs">
                Est. completion: {book.estimatedCompletion}
              </span>
            </div>

            <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {book.title}
            </h1>
            <p className="text-muted mt-2 text-xl">{book.subtitle}</p>
            <p className="text-muted mt-5 max-w-2xl text-base leading-7">
              {book.description}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 md:max-w-xl">
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
                  label: "Available now",
                  value: `${available} ch.`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="border-border bg-surface rounded-lg border p-3"
                >
                  <Icon className="text-subtle mb-1 h-4 w-4" aria-hidden />
                  <p className="text-foreground text-base font-bold">{value}</p>
                  <p className="text-subtle text-[10px]">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#chapter-1"
                className="bg-foreground text-background focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Read Chapter 1 — Free
              </a>
              <button
                type="button"
                disabled
                className="border-border text-subtle inline-flex items-center gap-2 rounded-lg border border-dashed px-5 py-2.5 text-sm font-medium"
              >
                Pre-order
                <span className="text-[10px]">(soon)</span>
              </button>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Full Table of Contents */}
      <section
        aria-labelledby="full-toc-heading"
        className="border-border border-b py-16 md:py-24"
      >
        <Container>
          <FadeInSection>
            <SectionHeader
              label="Contents"
              title="All Chapters"
              description="Expand any chapter to read the summary and key concepts. Available chapters can be read now."
              id="full-toc-heading"
            />
          </FadeInSection>
          <FadeInSection delay={0.05}>
            <TableOfContents chapters={book.chapters} />
          </FadeInSection>
        </Container>
      </section>

      {/* Why I am writing this */}
      <section className="border-border border-b py-16 md:py-20">
        <Container>
          <FadeInSection>
            <div className="max-w-2xl">
              <p className="text-subtle mb-4 font-mono text-xs tracking-[0.2em] uppercase">
                Author&apos;s Note
              </p>
              <h2 className="text-foreground text-xl font-semibold">
                Why I am writing this
              </h2>
              <p className="text-muted mt-4 text-base leading-8">
                {book.whyWriting}
              </p>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Download Centre */}
      <DownloadCenter />
    </>
  );
}
