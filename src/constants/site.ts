export const SITE_CONFIG = {
  name: "J Suhas",
  title: "J Suhas — Software Engineer & Systems Builder",
  description:
    "Software Engineer specialising in distributed systems, AI applications, and high-performance web. Building scalable software, intelligent systems, and engineering experiences that people remember.",
  url: process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000",
  author: {
    name: "J Suhas",
    handle: "@jsuhas",
  },
  ogImage: "/og.png",
  keywords: [
    "J Suhas",
    "software engineer",
    "distributed systems",
    "full stack developer",
    "AI engineer",
    "react",
    "next.js",
    "typescript",
    "python",
    "system design",
    "bengaluru",
    "india",
    "design systems",
    "performance",
  ],
} as const;
