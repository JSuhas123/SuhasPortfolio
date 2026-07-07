import { Container } from "@/components/shared/Container";
import { EXPERIENCE, type ExperienceType } from "@/data/home/experience";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Briefcase, Code2, Trophy, Users } from "lucide-react";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";

const TYPE_CONFIG: Record<
  ExperienceType,
  { readonly icon: LucideIcon; readonly color: string }
> = {
  work: {
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  education: {
    icon: BookOpen,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  leadership: {
    icon: Users,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  hackathon: {
    icon: Trophy,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  community: { icon: Code2, color: "bg-surface-raised text-muted" },
};

/**
 * Compact experience timeline — summary only.
 * Full detail links to /experience.
 */
export function ExperienceSection() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Journey"
            title="Experience"
            action={{ label: "Full timeline", href: "/experience" }}
            id="experience-heading"
          />
        </FadeInSection>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="bg-border absolute top-2 bottom-2 left-[18px] w-px"
            aria-hidden
          />

          <ol className="space-y-8">
            {EXPERIENCE.map((entry, i) => {
              const cfg = TYPE_CONFIG[entry.type];
              const Icon = cfg.icon;

              return (
                <FadeInSection
                  key={`${entry.title}-${entry.period}`}
                  delay={i * 0.05}
                >
                  <li className="relative flex gap-5 pl-10">
                    {/* Timeline dot with icon */}
                    <div
                      className={cn(
                        "ring-background absolute left-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2",
                        cfg.color,
                      )}
                      aria-hidden
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-foreground text-sm font-semibold">
                            {entry.title}
                          </span>
                          <span className="text-muted mx-1.5" aria-hidden>
                            ·
                          </span>
                          <span className="text-muted text-sm">
                            {entry.organisation}
                          </span>
                          {entry.current && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-subtle text-xs">
                          {entry.period}
                        </span>
                      </div>

                      <p className="text-muted mt-1.5 text-sm leading-relaxed">
                        {entry.description}
                      </p>

                      {entry.highlight && (
                        <p className="text-accent mt-1 font-mono text-xs font-medium">
                          → {entry.highlight}
                        </p>
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
