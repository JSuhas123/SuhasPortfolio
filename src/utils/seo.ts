import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";

export function createPageMetadata(
  title: string,
  description: string,
  path: string = "/",
): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
