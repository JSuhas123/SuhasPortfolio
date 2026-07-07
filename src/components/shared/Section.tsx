import { cn } from "@/lib/utils";

interface SectionProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly as?: React.ElementType;
}

/**
 * Vertical rhythm wrapper for page sections.
 * Provides consistent spacing across breakpoints.
 */
export function Section({
  children,
  className,
  id,
  as: Tag = "section",
}: SectionProps) {
  const Comp = Tag as React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  return (
    <Comp id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </Comp>
  );
}
