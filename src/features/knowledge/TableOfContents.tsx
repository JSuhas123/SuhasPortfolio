"use client";

import { Badge } from "@/components/ui/Badge";
import type {
  BookChapter,
  ChapterDifficulty,
  ChapterStatus,
} from "@/data/knowledge/book";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Eye, Lock } from "lucide-react";
import { useState } from "react";

const DIFFICULTY_STYLE: Record<ChapterDifficulty, string> = {
  beginner:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  intermediate:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  advanced:
    "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
};

const STATUS_CONFIG: Record<
  ChapterStatus,
  { icon: LucideIcon; label: string; className: string }
> = {
  available: {
    icon: Eye,
    label: "Available",
    className: "text-emerald-600 dark:text-emerald-400",
  },
  preview: {
    icon: Eye,
    label: "Preview",
    className: "text-blue-600 dark:text-blue-400",
  },
  "coming-soon": {
    icon: Lock,
    label: "Coming Soon",
    className: "text-subtle",
  },
};

interface ChapterRowProps {
  readonly chapter: BookChapter;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
}

function ChapterRow({ chapter, isExpanded, onToggle }: ChapterRowProps) {
  const statusCfg = STATUS_CONFIG[chapter.status];
  const StatusIcon = statusCfg.icon;

  return (
    <li className="border-border bg-surface overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={cn(
          "flex w-full items-center gap-4 px-5 py-4 text-left",
          "hover:bg-surface-raised focus-visible:ring-accent transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
          chapter.status === "coming-soon" && "opacity-60",
        )}
      >
        {/* Chapter number */}
        <span className="text-subtle w-7 shrink-0 font-mono text-xs">
          {String(chapter.number).padStart(2, "0")}
        </span>

        {/* Title */}
        <span className="text-foreground flex-1 text-sm font-semibold">
          {chapter.title}
        </span>

        {/* Meta */}
        <div className="hidden items-center gap-3 sm:flex">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
              DIFFICULTY_STYLE[chapter.difficulty],
            )}
          >
            {chapter.difficulty}
          </span>
          <span className="text-subtle font-mono text-[10px]">
            {chapter.estimatedMinutes} min
          </span>
          <span
            className={cn(
              "flex items-center gap-1 text-[10px]",
              statusCfg.className,
            )}
          >
            <StatusIcon className="h-3 w-3" aria-hidden />
            {statusCfg.label}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "text-subtle ml-2 h-4 w-4 shrink-0 transition-transform duration-200",
            isExpanded && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {isExpanded && (
        <div className="border-border border-t px-5 pt-4 pb-4">
          <p className="text-muted text-sm leading-relaxed">
            {chapter.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chapter.keyConcepts.map((concept) => (
              <Badge key={concept} variant="tech">
                {concept}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

interface TableOfContentsProps {
  readonly chapters: readonly BookChapter[];
  readonly maxVisible?: number | undefined;
}

/**
 * Expandable chapter list.
 * maxVisible: if set, truncates after N chapters with a "Show all" toggle.
 */
export function TableOfContents({
  chapters,
  maxVisible,
}: TableOfContentsProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible =
    maxVisible && !showAll ? chapters.slice(0, maxVisible) : chapters;

  return (
    <div>
      <ol className="space-y-2" aria-label="Table of contents">
        {visible.map((chapter) => (
          <ChapterRow
            key={chapter.number}
            chapter={chapter}
            isExpanded={expanded === chapter.number}
            onToggle={() =>
              setExpanded((prev) =>
                prev === chapter.number ? null : chapter.number,
              )
            }
          />
        ))}
      </ol>

      {maxVisible && chapters.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="text-muted hover:text-foreground focus-visible:ring-accent mt-4 flex items-center gap-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              showAll && "rotate-180",
            )}
            aria-hidden
          />
          {showAll
            ? "Show fewer chapters"
            : `Show all ${chapters.length} chapters`}
        </button>
      )}
    </div>
  );
}
