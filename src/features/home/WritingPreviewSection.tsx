import Link from "next/link";
import { Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/Badge";
import { WRITING_PREVIEWS } from "@/data/home/writing-previews";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";
import type { Route } from "next";

/**
 * Writing preview — three article cards.
 * Links use /writing/[slug] which resolves to the placeholder page until
 * the writing section is built.
 */
export function WritingPreviewSection() {
  return (
    <section
      aria-labelledby="writing-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Writing"
            title="Engineering Articles"
            description="Technical writing on distributed systems, performance, and engineering craft."
            action={{ label: "Read all writing", href: "/writing" }}
            id="writing-heading"
          />
        </FadeInSection>

        <div className="space-y-4">
          {WRITING_PREVIEWS.map((post, i) => (
            <FadeInSection key={post.slug} delay={i * 0.06}>
              <Link
                href={`/writing/${post.slug}` as Route}
                className="group block rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-subtle">
                    <Clock className="h-3 w-3" aria-hidden />
                    {post.readingTime}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="skill">
                      {tag}
                    </Badge>
                  ))}
                  <span className="ml-auto text-[10px] text-subtle">
                    {post.date}
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
