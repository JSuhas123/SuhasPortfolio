import { SITE_CONFIG } from "@/constants/site";
import { getAllSimulationSlugs } from "@/data/lab/index";
import { getAllProjectSlugs } from "@/lib/projects";
import type { MetadataRoute } from "next";

/**
 * Comprehensive sitemap covering all static and dynamic routes.
 * Add writing post slugs here once that content layer is built.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/writing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/knowledge`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/book/distributed-systems`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/lab`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  const labRoutes: MetadataRoute.Sitemap = getAllSimulationSlugs().map(
    (slug) => ({
      url: `${base}/lab/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...projectRoutes, ...labRoutes];
}
