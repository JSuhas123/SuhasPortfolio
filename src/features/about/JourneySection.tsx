import { Container } from "@/components/shared/Container";
import { JOURNEY, type JourneyEventType } from "@/data/about/journey";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<
  JourneyEventType,
  { readonly dot: string; readonly badge: string }
> = {
  education: {
    dot: "bg-violet-500",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  opensource: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  hackathon: {
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  leadership: {
    dot: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  startup: {
    dot: "bg-pink-500",
    badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  internship: { dot: "bg-accent", badge: "bg-accent/10 text-accent" },
  project: {
    dot: "bg-foreground",
    badge: "bg-surface-raised text-foreground border border-border",
  },
  current: { dot: "bg-accent", badge: "bg-accent/10 text-accent" },
};

export function JourneySection() {
  return (
    <section
      aria-labelledby="journey-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Timeline"
            title="The Journey"
            id="journey-heading"
          />
        </FadeInSection>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="bg-border absolute top-2 bottom-2 left-[18px] w-px"
            aria-hidden
          />

          <ol className="space-y-10">
            {JOURNEY.map((event, i) => {
              const styles = TYPE_STYLES[event.type];
              return (
                <FadeInSection
                  key={`${event.year}-${event.title}`}
                  delay={i * 0.04}
                >
                  <li className="relative flex gap-5 pl-10">
                    {/* Year dot */}
                    <div
                      className={cn(
                        "ring-background absolute left-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2",
                        event.type === "current"
                          ? "bg-accent animate-pulse"
                          : styles.dot,
                      )}
                      aria-hidden
                    />

                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-foreground text-sm font-semibold">
                          {event.title}
                        </h3>
                        <span className="text-subtle shrink-0 font-mono text-xs">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-muted mt-1.5 text-sm leading-relaxed">
                        {event.description}
                      </p>
                      {event.tags && event.tags.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                                styles.badge,
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                </FadeInSection>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
