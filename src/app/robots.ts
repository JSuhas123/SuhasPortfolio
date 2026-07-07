import { SITE_CONFIG } from "@/constants/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        // Development-only showcase page — should not be indexed
        "/design-system",
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
