export type AchievementCategory =
  | "hackathon"
  | "opensource"
  | "leadership"
  | "community"
  | "academic";

export interface ExperienceAchievement {
  readonly category: AchievementCategory;
  readonly title: string;
  readonly context: string;
  readonly description: string;
  readonly year: string;
}

export const EXPERIENCE_ACHIEVEMENTS: readonly ExperienceAchievement[] = [
  {
    category: "opensource",
    title: "Top Open Source Contributor",
    context: "Open Source Community",
    year: "2022 – Present",
    description:
      "Recognised for consistent, high-quality contributions to open source repositories. Active across code reviews, pull requests, and community-driven engineering projects.",
  },
  {
    category: "hackathon",
    title: "Hacknovate — Finalist",
    context: "National Hackathon",
    year: "2023",
    description:
      "Reached the finals at Hacknovate, competing against teams from across the country. Built an engineering prototype under a 24-hour time constraint.",
  },
  {
    category: "hackathon",
    title: "BrinHack — Runner-up",
    context: "National Hackathon",
    year: "2023",
    description:
      "Finished as runner-up at BrinHack. Designed and shipped a working system prototype demonstrating strong technical execution and product thinking.",
  },
  {
    category: "leadership",
    title: "Campus Ambassador",
    context: "Technology Industry Partnership",
    year: "2023 – 2024",
    description:
      "Selected as the campus ambassador for a technology partnership. Led workshops, mentored students, and represented the college at national-level events.",
  },
  {
    category: "community",
    title: "Hackathon Organiser",
    context: "College Technical Council",
    year: "2022 – 2023",
    description:
      "Organised two college-level hackathons with 200+ participants each. Handled sponsorships, logistics, judging, and post-event community engagement.",
  },
];
