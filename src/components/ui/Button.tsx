"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

/**
 * Button — the primary interactive element.
 *
 * Variants: primary | secondary | ghost | outline | link | destructive
 * Sizes:    sm | md | lg | icon
 *
 * Use `asChild` to render as any element (e.g. next/link) while keeping
 * Button's visual styles. The child receives all props via Radix Slot.
 *
 * @example
 *   <Button variant="primary">Save</Button>
 *   <Button variant="ghost" size="icon"><X /></Button>
 *   <Button asChild><Link href="/about">About</Link></Button>
 *   <Button loading>Saving…</Button>
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
    "transition-colors select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background hover:bg-foreground/85",
        secondary:
          "bg-surface-raised text-foreground border border-border hover:bg-surface-raised/70",
        ghost: "text-foreground hover:bg-surface-raised",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface-raised",
        link: "text-accent underline-offset-4 hover:underline h-auto p-0 font-normal",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-7 px-3 text-xs rounded-md",
        md: "h-9 px-4",
        lg: "h-11 px-6 text-base rounded-lg",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
  readonly loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot
        className={classes}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

export { buttonVariants };
