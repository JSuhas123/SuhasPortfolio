import { Container } from "@/components/shared/Container";
import { LEADERSHIP_ROLES, type LeadershipType } from "@/data/about/leadership";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Award, Code2, Crown, Trophy, Users } from "lucide-react";

const TYPE_CONFIG: Record<
  LeadershipType,
  { readonly icon: LucideIcon; readonly color: string }
> = {
  ambassador: {
    icon: Award,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  president: {
    icon: Crown,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  cofounder: { icon: Code2, color: "bg-accent/10 text-accent" },
  hackathon: {
    icon: Trophy,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  community: {
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
};

export function LeadershipSection() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Impact"
            title="Leadership & Community"
            id="leadership-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP_ROLES.map((role, i) => {
            const cfg = TYPE_CONFIG[role.type];
            const Icon = cfg.icon;
            return (
              <FadeInSection key={role.title} delay={i * 0.05}>
                <div className="border-border bg-surface flex h-full flex-col rounded-xl border p-5">
                  <div
                    className={cn(
                      "mb-3 flex h-9 w-9 items-center justify-center rounded-lg",
                      cfg.color,
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-foreground text-sm font-semibold">
                    {role.title}
                  </p>
                  <p className="text-muted mt-0.5 text-xs">
                    {role.organisation}
                  </p>
                  <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">
                    {role.description}
                  </p>
                  {role.impact && (
                    <p className="text-accent mt-3 font-mono text-xs font-medium">
                      → {role.impact}
                    </p>
                  )}
                  <p className="text-subtle mt-2 text-[10px]">{role.period}</p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
