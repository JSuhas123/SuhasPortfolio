export type EmploymentType = "internship" | "fulltime" | "contract" | "parttime";

export interface WorkExperience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly type: EmploymentType;
  readonly location: string;
  readonly description: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly string[];
  readonly achievements?: readonly string[] | undefined;
}

export const WORK_EXPERIENCE: readonly WorkExperience[] = [
  {
    company: "MindMatrix",
    role: "Software Engineering Intern",
    period: "2024",
    type: "internship",
    location: "India",
    description:
      "Contributed to full-stack software development, working across the frontend and backend layers of the product. Built and improved features, wrote tests, and participated in code reviews.",
    responsibilities: [
      "Developed and maintained web application features using React and TypeScript",
      "Collaborated with the backend team on API design and integration",
      "Participated in sprint planning, code reviews, and engineering discussions",
      "Improved component performance and codebase quality",
    ],
    technologies: ["React", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    company: "CityX",
    role: "Full Stack Developer Intern",
    period: "2024",
    type: "internship",
    location: "India",
    description:
      "Worked on full-stack development across web and backend services. Contributed to product features and infrastructure, bridging frontend experience with backend logic.",
    responsibilities: [
      "Built full-stack features spanning frontend UI and server-side APIs",
      "Worked with Python-based backend services and database integration",
      "Collaborated on product requirements and technical design discussions",
      "Contributed to documentation and deployment workflows",
    ],
    technologies: ["Python", "FastAPI", "React", "PostgreSQL"],
  },
  {
    company: "Surgewing",
    role: "Software Engineering Intern",
    period: "2024",
    type: "internship",
    location: "India",
    description:
      "Contributed to software engineering efforts, developing features and improving existing systems. Gained experience working in a startup engineering environment.",
    responsibilities: [
      "Designed and implemented software features aligned with product requirements",
      "Worked on backend services and integration with external APIs",
      "Participated in technical discussions and contributed to architecture decisions",
      "Wrote clean, maintainable code following team standards",
    ],
    technologies: ["Python", "Node.js", "React", "MongoDB"],
  },
];
