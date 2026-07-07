import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";
import { READING_RECOMMENDATIONS } from "@/data/knowledge/recommendations";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { ExternalLink } from "lucide-react";

/**
 * Six books that shaped the author's systems thinking.
 * Cover placeholder uses a generated colour block from the book's hue.
 */
export function ReadingRecommendations() {
  return (
    <section
      aria-labelledby="reading-recs-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Bookshelf"
            title="Books That Influenced My Thinking"
            description="Six technical books I'd recommend to any engineer working on distributed systems."
            id="reading-recs-heading"
          />
        </FadeInSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {READING_RECOMMENDATIONS.map((book, i) => (
            <FadeInSection key={book.title} delay={i * 0.05}>
              <div className="border-border bg-surface flex h-full flex-col overflow-hidden rounded-xl border">
                {/* Cover placeholder */}
                <div
                  className="flex h-28 items-end p-4"
                  style={{
                    background: `linear-gradient(135deg, hsl(${book.coverHue} 55% 18%), hsl(${book.coverHue} 45% 10%))`,
                  }}
                >
                  <div>
                    <p
                      className="text-xs font-bold tracking-wide uppercase"
                      style={{
                        color: `hsl(${book.coverHue} 80% 80%)`,
                      }}
                    >
                      {book.title.length > 30
                        ? book.title.slice(0, 28) + "…"
                        : book.title}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: `hsl(${book.coverHue} 60% 60%)` }}
                    >
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <Badge variant="skill" className="mb-3 self-start">
                    {book.category}
                  </Badge>
                  <p className="text-muted flex-1 text-sm leading-relaxed">
                    {book.review}
                  </p>
                  <a
                    href={book.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 focus-visible:ring-accent mt-4 flex items-center gap-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    Get the book
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
