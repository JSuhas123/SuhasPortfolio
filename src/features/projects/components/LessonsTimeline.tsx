import type { LessonData, LessonType } from "@/data/projects/types";
import { cn } from "@/lib/utils";

const LESSON_CONFIG: Record<
  LessonType,
  {
    readonly label: string;
    readonly colorClass: string;
    readonly dotClass: string;
  }
> = {
  mistake: {
    label: "Mistake",
    colorClass: "text-red-600 dark:text-red-400",
    dotClass: "bg-red-500",
  },
  insight: {
    label: "Insight",
    colorClass: "text-blue-600 dark:text-blue-400",
    dotClass: "bg-blue-500",
  },
  win: {
    label: "Win",
    colorClass: "text-emerald-600 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
};

interface LessonsTimelineProps {
  readonly lessons: readonly LessonData[];
}

/**
 * Vertical timeline of lessons learned.
 * Each entry is color-coded by type: mistake (red), insight (blue), win (green).
 */
export function LessonsTimeline({ lessons }: LessonsTimelineProps) {
  return (
    <ol className="border-border relative space-y-8 border-l pl-6">
      {lessons.map((lesson) => {
        const config = LESSON_CONFIG[lesson.type];
        return (
          <li key={lesson.title} className="relative">
            {/* Timeline dot */}
            <span
              className={cn(
                "ring-background absolute top-1 -left-[1.625rem] h-3 w-3 rounded-full ring-2",
                config.dotClass,
              )}
              aria-hidden
            />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-widest uppercase",
                    config.colorClass,
                  )}
                >
                  {config.label}
                </span>
              </div>
              <h4 className="text-foreground mt-1 text-sm font-semibold">
                {lesson.title}
              </h4>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">
                {lesson.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
