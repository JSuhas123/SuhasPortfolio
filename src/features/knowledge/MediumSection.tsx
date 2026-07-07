import { Clock, ExternalLink, Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { MEDIUM_PROFILE } from "@/data/knowledge/medium";

/**
 * Medium profile card + recent articles.
 * Static data — no API integration.
 */
export function MediumSection() {
  const { name, handle, bio, profileUrl, articles } = MEDIUM_PROFILE;

  return (
    <section
      aria-labelledby="medium-heading"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Medium"
            title="Engineering Articles"
            id="medium-heading"
          />
        </FadeInSection>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Profile card */}
          <FadeInSection className="lg:w-64 lg:shrink-0">
            <div className="rounded-xl border border-border bg-surface p-6">
              {/* Avatar placeholder */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
                JS
              </div>
              <p className="font-semibold text-foreground">{name}</p>
              <p className="font-mono text-xs text-muted">{handle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{bio}</p>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Visit Medium
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </FadeInSection>

          {/* Articles */}
          <div className="flex-1 space-y-4">
            {articles.map((article, i) => (
              <FadeInSection key={article.title} delay={i * 0.06}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-border-subtle hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {article.title}
                    </h3>
                    <ExternalLink
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-subtle"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] text-subtle">
                      <Clock className="h-3 w-3" aria-hidden />
                      {article.readingTime}
                    </span>
                    {article.claps !== undefined && (
                      <span className="flex items-center gap-1 text-[10px] text-subtle">
                        <Heart className="h-3 w-3" aria-hidden />
                        {article.claps}
                      </span>
                    )}
                    <span className="text-[10px] text-subtle">{article.date}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="skill">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </a>
              </FadeInSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
