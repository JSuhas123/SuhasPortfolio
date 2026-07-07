export type SimulationCategory =
  | "networking"
  | "distributed-systems"
  | "backend"
  | "databases"
  | "caching"
  | "api-design"
  | "algorithms";

export type SimulationDifficulty = "beginner" | "intermediate" | "advanced";

export interface SimulationCodeExample {
  readonly language: string;
  readonly filename?: string | undefined;
  readonly code: string;
  readonly description: string;
}

export interface SimulationDef {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly category: SimulationCategory;
  readonly difficulty: SimulationDifficulty;
  readonly estimatedMinutes: number;
  readonly tags: readonly string[];
  // ── Educational content ──────────────────────────────────────
  readonly problem: string;
  readonly realWorldUse: string;
  readonly howItWorks: string;
  readonly tradeoffs: string;
  readonly whenToUse: string;
  readonly whenNotToUse: string;
  readonly relatedConcepts: readonly string[];
  readonly codeExample: SimulationCodeExample;
}
