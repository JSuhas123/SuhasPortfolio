import { cn } from "@/lib/utils";

type Gap = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type Align = "start" | "center" | "end" | "stretch" | "baseline";
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";
type Direction = "row" | "col" | "row-reverse" | "col-reverse";

interface StackProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly gap?: Gap;
  readonly direction?: Direction;
  readonly align?: Align;
  readonly justify?: Justify;
  readonly wrap?: boolean;
  readonly as?: React.ElementType;
}

const gapMap: Record<Gap, string> = {
  "0": "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};

const alignMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const directionMap: Record<Direction, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

/**
 * Stack — a one-dimensional flex container.
 *
 * @example
 *   <Stack gap="md" align="center">
 *     <Button>Primary</Button>
 *     <Button variant="ghost">Cancel</Button>
 *   </Stack>
 *
 *   <Stack direction="col" gap="sm">
 *     <H2>Section title</H2>
 *     <Lead>Description</Lead>
 *   </Stack>
 */
export function Stack({
  children,
  className,
  gap = "md",
  direction = "row",
  align,
  justify,
  wrap = false,
  as: Tag = "div",
}: StackProps) {
  const Comp = Tag as React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  return (
    <Comp
      className={cn(
        "flex",
        directionMap[direction],
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
