import { Container } from "@/components/shared/Container";
import {
  EXPERIENCE_ACHIEVEMENTS,
  type AchievementCategory,
} from "@/data/experience/achievements";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Award, Code2, Star, Trophy, Users } from "lucide-react";

const CATEGORY_CONFIG: Record<
  AchievementCategory,
  { readonly icon: LucideIcon; readonly color: string }
> = {
  hackathon: {
    icon: Trophy,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  opensource: {
    icon: Code2,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  leadership: {
    icon: Users,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  community: {
    icon: Star,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  academic: { icon: Award, color: "bg-surface-raised text-muted" },
};

export function ExperienceAchievements() {
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
          {EXPERIENCE_ACHIEVEMENTS.map((achievement, i) => {
            const cfg = CATEGORY_CONFIG[achievement.category];
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
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-sm font-semibold">
                        {achievement.title}
                      </p>
                      <p className="text-muted text-xs">
                        {achievement.context}
                      </p>
                    </div>
                    <span className="text-subtle shrink-0 font-mono text-[10px]">
                      {achievement.year}
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
