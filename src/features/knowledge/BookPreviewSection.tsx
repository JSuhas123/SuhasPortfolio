import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { DISTRIBUTED_SYSTEMS_BOOK } from "@/data/knowledge/book";

/**
 * Book overview section: description, target audience, what readers will learn.
 */
export function BookPreviewSection() {
  const book = DISTRIBUTED_SYSTEMS_BOOK;

  return (
    <section
      aria-labelledby="book-preview-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="About the Book"
            title="What You Will Learn"
            id="book-preview-heading"
          />
        </FadeInSection>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Target audience */}
          <FadeInSection delay={0.04}>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-subtle">
                Who should read this
              </p>
              <ul className="space-y-3">
                {book.targetAudience.map((audience) => (
                  <li key={audience} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          {/* What you will learn */}
          <FadeInSection delay={0.08}>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-subtle">
                What you will learn
              </p>
              <ul className="space-y-3">
                {book.whatYouWillLearn.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>

        {/* Why I'm writing this */}
        <FadeInSection delay={0.1} className="mt-10">
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
              Why I am writing this
            </p>
            <p className="text-sm leading-7 text-muted">{book.whyWriting}</p>
          </div>
        </FadeInSection>
      </Container>
    </section>
  );
}
