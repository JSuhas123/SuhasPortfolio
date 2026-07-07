export interface WritingPreview {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly readingTime: string;
  readonly date: string;
  readonly tags: readonly string[];
}

export const WRITING_PREVIEWS: readonly WritingPreview[] = [
  {
    slug: "rate-limiting-at-scale",
    title: "Rate Limiting at Scale: Token Bucket vs Sliding Window",
    excerpt:
      "When rate limiting fails at scale, it's usually not the algorithm — it's the state storage. Here's what I've learned running token buckets in production and what the trade-offs actually look like at 10M req/day.",
    readingTime: "7 min",
    date: "2026",
    tags: ["system-design", "api-design", "backend"],
  },
  {
    slug: "constraint-satisfaction-in-practice",
    title: "Constraint Satisfaction in Practice: OR-Tools for Real Scheduling",
    excerpt:
      "Moving from greedy heuristics to Mixed-Integer Linear Programming for airport gate assignment. Why provably optimal solutions are worth the complexity budget — and when they aren't.",
    readingTime: "9 min",
    date: "2025",
    tags: ["algorithms", "optimization", "distributed-systems"],
  },
  {
    slug: "engineering-portfolio-as-product",
    title: "This Portfolio Is a Product, Not a Template",
    excerpt:
      "Most developer portfolios are Notion exports wrapped in a React template. This one is documented with real architecture decisions, measured performance, and honest failure analysis. Here's why that matters.",
    readingTime: "5 min",
    date: "2026",
    tags: ["engineering", "career", "documentation"],
  },
];
