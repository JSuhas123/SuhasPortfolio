import { SITE_CONFIG } from "@/constants/site";
import type { Metadata } from "next";

/**
 * Creates the base site-wide metadata object.
 * Pass overrides to customise individual pages.
 */
export function createMetadata(override: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: SITE_CONFIG.title,
      template: `%s — ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author.name }],
    creator: SITE_CONFIG.author.name,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [SITE_CONFIG.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...override,
  };
}
