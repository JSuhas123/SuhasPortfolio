import { Container } from "@/components/shared/Container";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Section } from "@/components/shared/Section";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface WritingSlugPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateMetadata({
  params,
}: WritingSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function WritingSlugPage({
  params,
}: WritingSlugPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return (
    <PageWrapper>
      <Section>
        <Container>
          <p className="text-subtle font-mono text-xs">/writing/{slug}</p>
          <h1 className="text-foreground mt-2 text-2xl font-semibold tracking-tight">
            {slug}
          </h1>
          <p className="text-muted mt-2 text-sm">Coming soon.</p>
        </Container>
      </Section>
    </PageWrapper>
  );
}
