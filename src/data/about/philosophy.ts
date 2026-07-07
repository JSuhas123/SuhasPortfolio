export interface PhilosophyCard {
  readonly title: string;
  readonly description: string;
  readonly icon: string; // lucide icon name
}

export const PHILOSOPHY_CARDS: readonly PhilosophyCard[] = [
  {
    title: "Build for users",
    description:
      "Software exists to solve human problems. Every decision — from API design to button placement — should trace back to a real person with a real need.",
    icon: "Users",
  },
  {
    title: "Performance is a feature",
    description:
      "Latency is user experience. A 200ms delay is a design decision. Treating performance as an afterthought is technical debt from day one.",
    icon: "Zap",
  },
  {
    title: "Accessibility matters",
    description:
      "Great software works for everyone. Accessibility is not a compliance checkbox — it's a reflection of how much you care about who uses what you build.",
    icon: "Eye",
  },
  {
    title: "Systems over shortcuts",
    description:
      "The right abstraction, built once, saves a hundred workarounds. Investing in foundations — even when the deadline is tomorrow — pays compounding returns.",
    icon: "Layers",
  },
  {
    title: "Learn continuously",
    description:
      "The field moves fast. The engineers who stay relevant aren't the ones who learned the most — they're the ones who kept learning. Curiosity is a professional skill.",
    icon: "BookOpen",
  },
  {
    title: "Think before coding",
    description:
      "Understanding the problem fully is at least half the solution. Most bugs are requirements that were never properly understood.",
    icon: "BrainCircuit",
  },
];
