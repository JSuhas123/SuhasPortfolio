/**
 * Shared primitive UI types used across the component library.
 * Import from @/types/ui, not from individual component files.
 */

export type Size = "sm" | "md" | "lg";

export type ButtonVariant =
  "primary" | "secondary" | "ghost" | "outline" | "link" | "destructive";

export type BadgeVariant =
  | "default"
  | "skill"
  | "tech"
  | "featured"
  | "active"
  | "completed"
  | "archived";

export type Status = "active" | "completed" | "archived";

export type ColorToken =
  | "background"
  | "foreground"
  | "muted"
  | "subtle"
  | "border"
  | "accent"
  | "surface"
  | "surface-raised";
