import { cn } from "@/lib/utils";

interface TypographyProps {
  readonly children: React.ReactNode;
  readonly className?: string | undefined;
}

// ─── Display scale ────────────────────────────────────────────────────────────

/** Largest display text — reserved for hero/splash moments. Renders as h1. */
export function DisplayXL({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-foreground scroll-m-20 text-5xl font-bold tracking-tight lg:text-7xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

/** Large display text — section heroes, landing sections. Renders as h1. */
export function DisplayL({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-foreground scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

// ─── Heading scale ────────────────────────────────────────────────────────────

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-foreground scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-foreground scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-foreground scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "text-foreground scroll-m-20 text-base font-semibold tracking-tight lg:text-lg",
        className,
      )}
    >
      {children}
    </h4>
  );
}

// ─── Body scale ───────────────────────────────────────────────────────────────

/** Intro paragraph — larger and slightly muted. */
export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-muted text-lg leading-8", className)}>{children}</p>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-foreground leading-7 [&:not(:first-child)]:mt-6",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Smaller body text — good for supplementary content. */
export function Small({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-foreground text-sm leading-relaxed", className)}>
      {children}
    </p>
  );
}

export function Muted({ children, className }: TypographyProps) {
  return <p className={cn("text-muted text-sm", className)}>{children}</p>;
}

/** Tiny metadata text — dates, tags, secondary labels. */
export function Caption({ children, className }: TypographyProps) {
  return (
    <span className={cn("text-subtle text-xs", className)}>{children}</span>
  );
}

// ─── Special ──────────────────────────────────────────────────────────────────

/** Inline monospaced code with a subtle background chip. */
export function Code({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        "bg-surface-raised text-foreground relative rounded-sm px-[0.4em] py-[0.15em] font-mono text-sm font-medium",
        className,
      )}
    >
      {children}
    </code>
  );
}

/** Blockquote with left border accent. */
export function Quote({ children, className }: TypographyProps) {
  return (
    <blockquote
      className={cn(
        "border-border text-muted border-l-2 pl-6 italic",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

// ─── Legacy aliases (backward-compatible) ─────────────────────────────────────

export function Display({ children, className }: TypographyProps) {
  return <H1 className={className}>{children}</H1>;
}

export function Heading({ children, className }: TypographyProps) {
  return <H2 className={className}>{children}</H2>;
}

export function Subheading({ children, className }: TypographyProps) {
  return <H3 className={className}>{children}</H3>;
}

export function InlineCode({ children, className }: TypographyProps) {
  return <Code className={className}>{children}</Code>;
}

export function Blockquote({ children, className }: TypographyProps) {
  return <Quote className={className}>{children}</Quote>;
}
