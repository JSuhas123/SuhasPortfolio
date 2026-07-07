import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Badge — compact label for categories, status, and technology tags.
 *
 * Variants: default | skill | tech | featured | active | completed | archived
 *
 * @example
 *   <Badge>New</Badge>
 *   <Badge variant="tech">TypeScript</Badge>
 *   <Badge variant="active">Active</Badge>
 *   <Badge variant="featured">Featured</Badge>
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-raised text-foreground border border-border",
        skill: "bg-surface-raised text-muted border border-border",
        tech: "bg-surface-raised text-foreground border border-border font-mono tracking-tight",
        featured: "bg-foreground text-background",
        active:
          "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:text-emerald-400",
        completed: "bg-surface-raised text-muted border border-border",
        archived: "bg-surface-raised text-subtle border border-border-subtle",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
