import { cn } from "@/lib/utils";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface SpacerProps {
  readonly size?: SpacerSize;
  readonly axis?: "vertical" | "horizontal";
  readonly className?: string;
}

const sizeMap: Record<SpacerSize, { vertical: string; horizontal: string }> = {
  xs: { vertical: "h-2", horizontal: "w-2" },
  sm: { vertical: "h-4", horizontal: "w-4" },
  md: { vertical: "h-8", horizontal: "w-8" },
  lg: { vertical: "h-12", horizontal: "w-12" },
  xl: { vertical: "h-16", horizontal: "w-16" },
  "2xl": { vertical: "h-24", horizontal: "w-24" },
  "3xl": { vertical: "h-32", horizontal: "w-32" },
};

/**
 * Spacer — a blank gap element for vertical or horizontal spacing.
 * Prefer margin/gap utilities for most cases; use Spacer for semantic spacing.
 *
 * @example
 *   <Spacer size="xl" />
 *   <Spacer size="md" axis="horizontal" />
 */
export function Spacer({
  size = "md",
  axis = "vertical",
  className,
}: SpacerProps) {
  const sizeClass =
    axis === "vertical" ? sizeMap[size].vertical : sizeMap[size].horizontal;

  return (
    <div
      aria-hidden
      className={cn(
        sizeClass,
        axis === "horizontal" ? "inline-block" : "block",
        className,
      )}
    />
  );
}
