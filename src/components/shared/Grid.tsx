import { cn } from "@/lib/utils";

type Cols = 1 | 2 | 3 | 4 | 5 | 6;
type GridGap = "sm" | "md" | "lg" | "xl";

interface GridProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly cols?: Cols;
  readonly smCols?: Cols;
  readonly mdCols?: Cols;
  readonly lgCols?: Cols;
  readonly gap?: GridGap;
  readonly as?: React.ElementType;
}

const colMap: Record<Cols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const smColMap: Record<Cols, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

const mdColMap: Record<Cols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColMap: Record<Cols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const gapMap: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

/**
 * Grid — a responsive CSS Grid container.
 *
 * @example
 *   <Grid cols={1} mdCols={2} lgCols={3} gap="md">
 *     {projects.map(p => <ProjectCard key={p.slug} {...p} />)}
 *   </Grid>
 */
export function Grid({
  children,
  className,
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = "md",
  as: Tag = "div",
}: GridProps) {
  const Comp = Tag as React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  return (
    <Comp
      className={cn(
        "grid",
        colMap[cols],
        smCols && smColMap[smCols],
        mdCols && mdColMap[mdCols],
        lgCols && lgColMap[lgCols],
        gapMap[gap],
        className,
      )}
    >
      {children}
    </Comp>
  );
}
