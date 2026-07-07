import { AI_CRIME_PLATFORM } from "./ai-crime-platform";
import { AIRPORT_OPTIMIZATION } from "./airport-optimization";
import { ENGINEERING_PORTFOLIO } from "./engineering-portfolio";
import type { ProjectData } from "./types";

/** All projects in reverse-chronological order (most recent first). */
const PROJECT_REGISTRY: readonly ProjectData[] = [
  ENGINEERING_PORTFOLIO,
  AIRPORT_OPTIMIZATION,
  AI_CRIME_PLATFORM,
];

export function getAllProjects(): readonly ProjectData[] {
  return PROJECT_REGISTRY;
}

export function getFeaturedProjects(): readonly ProjectData[] {
  return PROJECT_REGISTRY.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): ProjectData | null {
  return PROJECT_REGISTRY.find((p) => p.slug === slug) ?? null;
}

/** Returns the project before and after the given slug (by registry order). */
export function getAdjacentProjects(slug: string): {
  readonly prev: ProjectData | null;
  readonly next: ProjectData | null;
} {
  const idx = PROJECT_REGISTRY.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: PROJECT_REGISTRY[idx - 1] ?? null,
    next: PROJECT_REGISTRY[idx + 1] ?? null,
  };
}

export function getAllProjectSlugs(): readonly string[] {
  return PROJECT_REGISTRY.map((p) => p.slug);
}

export type { ProjectData };
