import { Container } from "@/components/shared/Container";
import { DISTRIBUTED_SYSTEMS_BOOK } from "@/data/knowledge/book";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { BookPreviewSection } from "@/features/knowledge/BookPreviewSection";
import { DownloadCenter } from "@/features/knowledge/DownloadCenter";
import { FeaturedBook } from "@/features/knowledge/FeaturedBook";
import { KnowledgeHero } from "@/features/knowledge/KnowledgeHero";
import { MediumSection } from "@/features/knowledge/MediumSection";
import { ReadingRecommendations } from "@/features/knowledge/ReadingRecommendations";
import { TableOfContents } from "@/features/knowledge/TableOfContents";
import { createPageMetadata } from "@/utils/seo";
import type { Metadata, Route } from "next";

export const metadata: Metadata = createPageMetadata(
  "Knowledge Hub — J Suhas",
  "Engineering writing, systems thinking, and the Distributed Systems book by J Suhas.",
  "/knowledge",
);

export default function KnowledgePage() {
  return (
    <>
      <KnowledgeHero />
      <FeaturedBook />
      <BookPreviewSection />

      {/* Abbreviated ToC — first 6 chapters, expandable */}
      <section
        aria-labelledby="toc-preview-heading"
        className="border-border border-t py-16 md:py-24"
      >
        <Container>
          <FadeInSection>
            <SectionHeader
              label="Contents"
              title="Table of Contents"
              description="18 chapters from network fundamentals to production case studies."
              action={{
                label: "See full book",
                href: "/book/distributed-systems" as unknown as Route,
              }}
              id="toc-preview-heading"
            />
          </FadeInSection>
          <FadeInSection delay={0.05}>
            <TableOfContents
              chapters={DISTRIBUTED_SYSTEMS_BOOK.chapters}
              maxVisible={6}
            />
          </FadeInSection>
        </Container>
      </section>

      <DownloadCenter />
      <MediumSection />
      <ReadingRecommendations />
    </>
  );
}
