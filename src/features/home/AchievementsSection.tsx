import { Container } from "@/components/shared/Container";
import { ACHIEVEMENTS, type AchievementType } from "@/data/home/achievements";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Award, Code2, Globe, Trophy, Users, Zap } from "lucide-react";
import { FadeInSection } from "./FadeInSection";
import { SectionHeader } from "./SectionHeader";

const TYPE_CONFIG: Record<
  AchievementType,
  { readonly icon: LucideIcon; readonly color: string }
> = {
  hackathon: {
    icon: Trophy,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  award: {
    icon: Award,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  leadership: {
    icon: Users,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  community: {
    icon: Globe,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  deployment: { icon: Zap, color: "bg-accent/10 text-accent" },
  certification: { icon: Code2, color: "bg-surface-raised text-muted" },
};

/**
 * Professional achievements grid.
 * Each card is concise — type icon, title, context, description.
 */
export function AchievementsSection() {
  return (
    <section
      aria-labelledby="achievements-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Recognition"
            title="Achievements"
            id="achievements-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((achievement, i) => {
            const cfg = TYPE_CONFIG[achievement.type];
            const Icon = cfg.icon;
            return (
              <FadeInSection key={achievement.title} delay={i * 0.05}>
                <div className="border-border bg-surface rounded-xl border p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        cfg.color,
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground text-sm font-semibold">
                        {achievement.title}
                      </p>
                      <p className="text-muted text-xs">
                        {achievement.context}
                      </p>
                    </div>
                    <span className="text-subtle ml-auto shrink-0 text-[10px]">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="text-muted mt-3 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
