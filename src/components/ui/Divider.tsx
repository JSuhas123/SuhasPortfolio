import { cn } from "@/lib/utils";

interface DividerProps {
  readonly className?: string;
  readonly label?: string;
  readonly orientation?: "horizontal" | "vertical";
}

/**
 * Divider — a semantic separator between content regions.
 *
 * Pass `label` to render centred text (useful for form sections).
 *
 * @example
 *   <Divider />
 *   <Divider label="or continue with" />
 */
export function Divider({
  className,
  label,
  orientation = "horizontal",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("bg-border w-px self-stretch", className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-3", className)}
      >
        <div className="bg-border h-px flex-1" />
        <span className="text-subtle text-xs whitespace-nowrap">{label}</span>
        <div className="bg-border h-px flex-1" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn("border-border border-0 border-t", className)}
    />
  );
}
