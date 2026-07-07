export type ExperienceType =
  "work" | "education" | "leadership" | "community" | "hackathon";

export interface ExperienceEntry {
  readonly type: ExperienceType;
  readonly title: string;
  readonly organisation: string;
  readonly period: string;
  readonly description: string;
  readonly current?: boolean | undefined;
  readonly highlight?: string | undefined;
}

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    type: "work",
    title: "Staff Frontend Engineer",
    organisation: "Freelance / Contract",
    period: "2024 — Present",
    description:
      "Full-stack engineering work across AI platforms, real-time systems, and developer tooling. Projects span law enforcement analytics, airport operations, and engineering education.",
    current: true,
    highlight: "2 systems in production across 12+ organisations",
  },
  {
    type: "education",
    title: "B.Tech Computer Science",
    organisation: "University",
    period: "2021 — 2025",
    description:
      "Core coursework in algorithms, distributed systems, machine learning, and software engineering. Final year research in constraint-based optimisation.",
  },
  {
    type: "leadership",
    title: "Campus Technology Ambassador",
    organisation: "Tech Company Partnership",
    period: "2023 — 2024",
    description:
      "Delivered technical workshops on cloud and developer tools, mentored junior engineers, and represented the institution at national tech summits.",
    highlight: "500+ students reached",
  },
  {
    type: "hackathon",
    title: "Hackathon Organiser & Competitor",
    organisation: "Regional Circuit",
    period: "2022 — 2024",
    description:
      "Organised two college hackathons (200+ participants each) and competed in 8 national hackathons, placing in the top 3 at five of them.",
    highlight: "3× podium finish",
  },
  {
    type: "community",
    title: "Engineering Community Lead",
    organisation: "College Technical Council",
    period: "2022 — 2023",
    description:
      "Led a 15-person engineering chapter responsible for curriculum, speaker series, and open-source project incubation.",
  },
];
