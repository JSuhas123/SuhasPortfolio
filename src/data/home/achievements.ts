export type AchievementType =
  | "hackathon"
  | "award"
  | "leadership"
  | "community"
  | "deployment"
  | "certification";

export interface Achievement {
  readonly type: AchievementType;
  readonly title: string;
  readonly context: string;
  readonly date: string;
  readonly description: string;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    type: "deployment",
    title: "12 Law Enforcement Agencies",
    context: "AI Crime Intelligence Platform",
    date: "2023",
    description:
      "Platform deployed across three states and one federal task force, processing 2.3M+ incidents and achieving 94.2% pattern detection accuracy.",
  },
  {
    type: "deployment",
    title: "23% Reduction in Flight Delays",
    context: "Airport Optimization System",
    date: "2024",
    description:
      "Constraint-based scheduling engine reduced gate conflicts from 3.4/day to 0.2/day and improved gate utilisation from 74% to 89%.",
  },
  {
    type: "hackathon",
    title: "Hackathon Podium — 3 Times",
    context: "National Circuit, 2022–2024",
    date: "2022 – 2024",
    description:
      "Placed in the top 3 at five national hackathons across disciplines including AI, systems engineering, and social impact.",
  },
  {
    type: "leadership",
    title: "Campus Technology Ambassador",
    context: "Industry Partnership",
    date: "2023 – 2024",
    description:
      "Selected as campus ambassador, reaching 500+ students through workshops, mentorship sessions, and national tech summits.",
  },
  {
    type: "community",
    title: "Hackathon Organiser",
    context: "College Technical Council",
    date: "2022 – 2023",
    description:
      "Organised two college hackathons with 200+ participants each, handling sponsorship, judging, and logistics.",
  },
  {
    type: "community",
    title: "Engineering Community Lead",
    context: "College Technical Chapter",
    date: "2022 – 2023",
    description:
      "Led a 15-person chapter running curriculum, speaker series, and open-source incubation for the department.",
  },
];
