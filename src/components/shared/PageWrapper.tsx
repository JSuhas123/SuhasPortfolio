import { cn } from "@/lib/utils";

interface PageWrapperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * Per-page layout wrapper.
 * Provides consistent vertical padding and flex structure.
 * Pages render this as their outermost element.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("flex flex-1 flex-col", className)}>{children}</div>
  );
}
