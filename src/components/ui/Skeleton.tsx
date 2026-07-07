import { cn } from "@/lib/utils";

interface SkeletonProps {
  readonly className?: string;
}

/**
 * Skeleton — base loading placeholder.
 * Compose with specific variants for different UI shapes.
 *
 * @example
 *   <Skeleton className="h-4 w-48" />
 *   <SkeletonText lines={3} />
 *   <SkeletonCard />
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn("bg-surface-raised animate-pulse rounded-md", className)}
    />
  );
}

interface SkeletonTextProps {
  readonly lines?: number;
  readonly className?: string;
}

/**
 * SkeletonText — multiple lines of loading text.
 * The last line is shorter to mimic natural prose ending.
 */
export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("space-y-2", className)}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", index === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  readonly className?: string;
  readonly showFooter?: boolean;
}

/**
 * SkeletonCard — loading placeholder that matches the Card component layout.
 */
export function SkeletonCard({
  className,
  showFooter = false,
}: SkeletonCardProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "border-border bg-surface rounded-xl border p-6",
        className,
      )}
    >
      {/* Title */}
      <Skeleton className="mb-3 h-5 w-2/3" />
      {/* Description */}
      <SkeletonText lines={2} />
      {/* Tags */}
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      {showFooter && (
        <div className="border-border mt-4 border-t pt-4">
          <Skeleton className="h-4 w-1/4" />
        </div>
      )}
    </div>
  );
}

interface SkeletonBlockProps {
  readonly height?: string;
  readonly className?: string;
}

/**
 * SkeletonBlock — a generic rectangular placeholder.
 * Useful for images, code blocks, or custom shapes.
 */
export function SkeletonBlock({
  height = "h-48",
  className,
}: SkeletonBlockProps) {
  return <Skeleton className={cn("w-full rounded-xl", height, className)} />;
}
