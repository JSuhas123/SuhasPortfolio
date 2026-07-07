import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  readonly className?: string;
}

/**
 * Site logo — renders as a link to the homepage.
 * Replace the letter mark with an SVG once brand assets exist.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      className={cn(
        "text-foreground focus-visible:ring-accent inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold tracking-tight transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      S
    </Link>
  );
}
