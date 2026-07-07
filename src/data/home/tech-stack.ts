export interface TechItem {
  readonly name: string;
}

export interface TechCategory {
  readonly label: string;
  readonly items: readonly TechItem[];
}

export const TECH_STACK: readonly TechCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript" },
      { name: "Python" },
      { name: "SQL" },
      { name: "JavaScript" },
      { name: "Bash" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React 19" },
      { name: "Next.js 15" },
      { name: "Tailwind CSS v4" },
      { name: "Three.js" },
      { name: "React Three Fiber" },
      { name: "Motion" },
      { name: "React Flow" },
      { name: "Radix UI" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "REST / GraphQL" },
      { name: "Celery" },
      { name: "WebSockets" },
      { name: "Apache Kafka" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "MongoDB" },
      { name: "TimescaleDB" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "AWS" },
      { name: "Vercel" },
      { name: "Nginx" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "TensorFlow" },
      { name: "scikit-learn" },
      { name: "OR-Tools" },
      { name: "Pandas" },
      { name: "NumPy" },
    ],
  },
  {
    label: "Dev Tools",
    items: [
      { name: "Git" },
      { name: "pnpm" },
      { name: "Shiki" },
      { name: "ESLint" },
      { name: "Prettier" },
      { name: "Husky" },
    ],
  },
];
