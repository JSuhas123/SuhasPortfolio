"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  readonly className?: string;
}

/**
 * Toggles between light and dark mode.
 * Reads the resolved theme to avoid showing the wrong icon during hydration.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "text-muted hover:bg-surface-raised hover:text-foreground focus-visible:ring-accent inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
