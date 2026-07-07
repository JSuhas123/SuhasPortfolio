/**
 * Complete project data schema.
 * All required fields use plain types (no | undefined).
 * Optional sections are explicitly typed as T | undefined.
 */

export type ProjectStatus = "active" | "completed" | "archived";
export type ProjectComplexity = "medium" | "high" | "critical";
export type TechCategory =
  "frontend" | "backend" | "database" | "infrastructure" | "ml" | "tooling";
export type LessonType = "mistake" | "insight" | "win";
export type RequirementType = "functional" | "nonfunctional";
export type LinkType = "github" | "demo" | "article" | "docs" | "paper";
export type DiagramType = "flow" | "network" | "sequence" | "c4" | "er";

export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
  readonly unit?: string | undefined;
  readonly description?: string | undefined;
  readonly highlighted?: boolean | undefined;
}

export interface TechItem {
  readonly name: string;
  readonly category: TechCategory;
  /** Why this technology was chosen for this project */
  readonly reason: string;
}

export interface EngineeringDecisionData {
  readonly decision: string;
  readonly context: string;
  readonly alternatives: readonly string[];
  readonly rationale: string;
  readonly tradeoffs: string;
  readonly outcome: string;
}

export interface ChallengeData {
  readonly title: string;
  readonly description: string;
  readonly resolution: string;
}

export interface LessonData {
  readonly type: LessonType;
  readonly title: string;
  readonly description: string;
}

export interface ProjectLink {
  readonly type: LinkType;
  readonly label: string;
  readonly url: string;
}

export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string | undefined;
}

export interface CodeSnippet {
  readonly filename?: string | undefined;
  readonly language: string;
  readonly code: string;
  readonly description?: string | undefined;
}

export interface ProjectRequirement {
  readonly type: RequirementType;
  readonly title: string;
  readonly description: string;
}

export interface ArchitectureData {
  readonly overview: string;
  /** Multi-paragraph technical description */
  readonly details: string;
  readonly diagramType?: DiagramType | undefined;
  readonly diagramCaption?: string | undefined;
}

export interface ImplementationData {
  readonly overview: string;
  readonly highlights: readonly string[];
  readonly codeSnippets?: readonly CodeSnippet[] | undefined;
}

export interface PerformanceData {
  readonly summary: string;
  readonly details: readonly string[];
}

/** Top-level project document */
export interface ProjectData {
  // ── Identity ───────────────────────────────────────────────────
  readonly slug: string;
  readonly title: string;
  /** One-line summary shown in cards */
  readonly tagline: string;
  readonly description: string;
  readonly status: ProjectStatus;
  readonly featured: boolean;
  readonly complexity: ProjectComplexity;
  /** Human-readable period, e.g. "Oct 2023 – Mar 2024" */
  readonly timeline: string;
  /** ISO date YYYY-MM-DD — used for sort order */
  readonly date: string;
  readonly tags: readonly string[];

  // ── Narrative ──────────────────────────────────────────────────
  readonly problem: string;
  readonly background: string;
  readonly goals: readonly string[];
  readonly requirements: readonly ProjectRequirement[];

  // ── Technical ─────────────────────────────────────────────────
  readonly architecture: ArchitectureData;
  readonly techStack: readonly TechItem[];
  readonly decisions: readonly EngineeringDecisionData[];
  readonly challenges: readonly ChallengeData[];
  readonly implementation: ImplementationData;

  // ── Results ───────────────────────────────────────────────────
  readonly metrics: readonly ProjectMetric[];
  readonly performance?: PerformanceData | undefined;

  // ── Reflection ────────────────────────────────────────────────
  readonly lessons: readonly LessonData[];
  readonly improvements: readonly string[];

  // ── Media & Links ─────────────────────────────────────────────
  readonly images?: readonly ProjectImage[] | undefined;
  readonly links: readonly ProjectLink[];
  /** Slugs of related projects */
  readonly relatedProjects: readonly string[];
}
