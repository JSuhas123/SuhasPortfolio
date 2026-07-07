export interface BookRecommendation {
  readonly title: string;
  readonly author: string;
  readonly category: string;
  readonly review: string;
  readonly coverHue: number; // HSL hue for placeholder cover
  readonly purchaseUrl: string;
}

export const READING_RECOMMENDATIONS: readonly BookRecommendation[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Distributed Systems",
    review:
      "The single most comprehensive treatment of modern data systems I've encountered. Kleppmann explains the 'why' behind every trade-off. If you read one technical book this year, make it this one.",
    coverHue: 210,
    purchaseUrl: "https://dataintensive.net",
  },
  {
    title: "Site Reliability Engineering",
    author: "Google SRE Team",
    category: "Operations & Reliability",
    review:
      "How Google thinks about operating distributed systems at scale. The error budget concept alone is worth reading the book for. It reframes reliability as an engineering discipline, not an ops function.",
    coverHue: 15,
    purchaseUrl: "https://sre.google/books/",
  },
  {
    title: "Database Internals",
    author: "Alex Petrov",
    category: "Databases",
    review:
      "Fills the gap between database theory and implementation. Explains B-trees, LSM trees, consensus algorithms, and distributed storage without the hand-waving. Dense but worth it.",
    coverHue: 150,
    purchaseUrl: "https://www.databass.dev",
  },
  {
    title: "Fundamentals of Software Architecture",
    author: "Mark Richards & Neal Ford",
    category: "Architecture",
    review:
      "Excellent taxonomy of architectural styles and the trade-offs between them. The section on microservices vs. modular monolith is the most balanced take I've read.",
    coverHue: 270,
    purchaseUrl: "https://fundamentalsofsoftwarearchitecture.com",
  },
  {
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr & George Spafford",
    category: "Engineering Culture",
    review:
      "A novel about DevOps. Sounds gimmicky — isn't. The Three Ways framework it introduces explains most of the organisational dysfunction I've seen in engineering teams.",
    coverHue: 350,
    purchaseUrl: "https://itrevolution.com/product/the-phoenix-project",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    category: "Software Design",
    review:
      "The dependency rule is the core idea: source code dependencies must point inward. Everything else follows from that. Opinionated and practical — more useful than 'Clean Code'.",
    coverHue: 40,
    purchaseUrl: "https://www.cleanarchitecture.io",
  },
];
