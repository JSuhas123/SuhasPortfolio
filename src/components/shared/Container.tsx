import { cn } from "@/lib/utils";

interface ContainerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: React.ElementType;
}

/**
 * Max-width container with responsive horizontal padding.
 * Use `as` to render as a semantic element (section, article, nav…).
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  // Cast needed: React.ElementType is too broad for JSX children inference in React 19.
  const Comp = Tag as React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  return (
    <Comp
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
