export type JourneyEventType =
  | "education"
  | "opensource"
  | "hackathon"
  | "leadership"
  | "startup"
  | "internship"
  | "project"
  | "current";

export interface JourneyEvent {
  readonly year: string;
  readonly type: JourneyEventType;
  readonly title: string;
  readonly description: string;
  readonly tags?: readonly string[] | undefined;
}

export const JOURNEY: readonly JourneyEvent[] = [
  {
    year: "2022",
    type: "education",
    title: "Started Computer Science",
    description:
      "Enrolled in B.Tech Computer Science at Oxford College of Engineering, Bengaluru. Early focus on algorithms, data structures, and systems fundamentals.",
    tags: ["Oxford College of Engineering", "Bengaluru"],
  },
  {
    year: "2022 – 23",
    type: "opensource",
    title: "First Open Source Contributions",
    description:
      "Began contributing to open source projects. Learned code review processes, contribution workflows, and how to read large codebases.",
    tags: ["GitHub", "Open Source"],
  },
  {
    year: "2023",
    type: "hackathon",
    title: "Hackathon Circuit",
    description:
      "Participated in multiple national hackathons. Reached the finals at Hacknovate and finished as runner-up at BrinHack, building AI and systems prototypes under time pressure.",
    tags: ["Hacknovate Finalist", "BrinHack Runner-up"],
  },
  {
    year: "2023",
    type: "leadership",
    title: "Campus Ambassador & Leadership",
    description:
      "Took on the Campus Ambassador role, delivering technical workshops and representing the college at national summits. Also held a President-level leadership role in the college technical community.",
    tags: ["Campus Ambassador", "President"],
  },
  {
    year: "2023 – 24",
    type: "startup",
    title: "Co-Founded a Startup",
    description:
      "Co-founded an early-stage technology startup, gaining hands-on experience in building and shipping a product from zero to first users.",
    tags: ["Co-Founder", "Startup"],
  },
  {
    year: "2024",
    type: "internship",
    title: "Engineering Internships",
    description:
      "Completed multiple software engineering internships at MindMatrix, CityX, and Surgewing — applying full-stack, backend, and AI skills across different product domains.",
    tags: ["MindMatrix", "CityX", "Surgewing"],
  },
  {
    year: "2024 – 25",
    type: "project",
    title: "AI & Systems Projects",
    description:
      "Built and deployed production-grade systems: an AI crime intelligence platform reaching 12 agencies, and a constraint-solving airport scheduling engine that cut conflicts by 94%.",
    tags: ["AI", "Distributed Systems", "Production"],
  },
  {
    year: "2025 – Now",
    type: "current",
    title: "Today",
    description:
      "Focused on modern web, distributed systems, AI applications, and developer tools. Working on this portfolio as an engineering product, not a template.",
    tags: ["Current", "Open to Work"],
  },
];
