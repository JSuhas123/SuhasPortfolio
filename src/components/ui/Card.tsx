import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Status } from "@/types/ui";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

// ─── Base compound card ───────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, adds a subtle lift shadow on hover.
   * Use for interactive cards that link somewhere.
   */
  readonly hover?: boolean;
}

/**
 * Base Card — a flexible container with a consistent border and radius.
 * Compose with CardHeader, CardContent, CardFooter for structure.
 *
 * @example
 *   <Card>
 *     <CardHeader><CardTitle>Title</CardTitle></CardHeader>
 *     <CardContent>…</CardContent>
 *   </Card>
 */
export function Card({
  children,
  className,
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-xl border p-6",
        hover &&
          "cursor-pointer transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardSubProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function CardHeader({ children, className }: CardSubProps) {
  return <div className={cn("mb-4 space-y-1", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardSubProps) {
  return (
    <h3
      className={cn(
        "text-foreground text-base font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardSubProps) {
  return <p className={cn("text-muted text-sm", className)}>{children}</p>;
}

export function CardContent({ children, className }: CardSubProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardSubProps) {
  return (
    <div
      className={cn(
        "border-border mt-4 flex items-center gap-3 border-t pt-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly status?: Status;
  readonly href: string;
  readonly featured?: boolean;
}

/**
 * ProjectCard — displays a project with title, description, tags, and status.
 * Links to the project's detail page.
 */
export function ProjectCard({
  title,
  description,
  tags,
  status,
  href,
  featured = false,
}: ProjectCardProps) {
  const statusVariant: Record<Status, "active" | "completed" | "archived"> = {
    active: "active",
    completed: "completed",
    archived: "archived",
  };

  return (
    <Link
      href={href as Route}
      className="group border-border bg-surface hover:border-border-subtle focus-visible:ring-accent block rounded-xl border p-6 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground group-hover:text-accent text-base font-semibold tracking-tight transition-colors">
              {title}
            </h3>
            {featured && <Badge variant="featured">Featured</Badge>}
          </div>
          <p className="text-muted text-sm leading-relaxed">{description}</p>
        </div>
        <ArrowUpRight
          className="text-subtle mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="tech">
              {tag}
            </Badge>
          ))}
        </div>
        {status && <Badge variant={statusVariant[status]}>{status}</Badge>}
      </div>
    </Link>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

interface ArticleCardProps {
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly readingTime?: string;
  readonly tags?: readonly string[];
  readonly href: string;
}

/**
 * ArticleCard — displays a writing post with date, reading time, and tags.
 */
export function ArticleCard({
  title,
  description,
  date,
  readingTime,
  tags,
  href,
}: ArticleCardProps) {
  return (
    <Link
      href={href as Route}
      className="group border-border bg-surface hover:border-border-subtle focus-visible:ring-accent block rounded-xl border p-6 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-foreground group-hover:text-accent text-base font-semibold tracking-tight transition-colors">
          {title}
        </h3>
        <ArrowUpRight
          className="text-subtle mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>

      <p className="text-muted mt-2 text-sm leading-relaxed">{description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-subtle flex items-center gap-1 text-xs">
          <Calendar className="h-3 w-3" aria-hidden />
          {date}
        </span>
        {readingTime && (
          <span className="text-subtle flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" aria-hidden />
            {readingTime}
          </span>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="skill">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Timeline Card ────────────────────────────────────────────────────────────

interface TimelineCardProps {
  readonly title: string;
  readonly company: string;
  readonly period: string;
  readonly description?: string;
  readonly technologies?: readonly string[];
  readonly current?: boolean;
}

/**
 * TimelineCard — an experience/work history entry.
 */
export function TimelineCard({
  title,
  company,
  period,
  description,
  technologies,
  current = false,
}: TimelineCardProps) {
  return (
    <div className="before:bg-border before:ring-background relative pl-6 before:absolute before:top-2 before:left-0 before:h-2 before:w-2 before:rounded-full before:ring-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-foreground text-sm font-semibold">{title}</h3>
          <p className="text-muted text-sm">{company}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-subtle text-xs">{period}</span>
          {current && <Badge variant="active">Current</Badge>}
        </div>
      </div>

      {description && (
        <p className="text-muted mt-2 text-sm leading-relaxed">{description}</p>
      )}

      {technologies && technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <Badge key={tech} variant="tech">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Metric Card ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  readonly label: string;
  readonly value: string;
  readonly description?: string;
}

/**
 * MetricCard — a stat with a label and prominent value.
 */
export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="border-border bg-surface rounded-xl border p-6">
      <p className="text-subtle text-xs font-medium tracking-widest uppercase">
        {label}
      </p>
      <p className="text-foreground mt-2 text-3xl font-bold tracking-tight">
        {value}
      </p>
      {description && <p className="text-muted mt-1 text-xs">{description}</p>}
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

interface FeatureCardProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly className?: string;
}

/**
 * FeatureCard — icon + title + description for feature/capability lists.
 */
export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-xl border p-6",
        className,
      )}
    >
      <div className="bg-surface-raised text-foreground mb-4 flex h-9 w-9 items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3 className="text-foreground text-sm font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-muted mt-1.5 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
