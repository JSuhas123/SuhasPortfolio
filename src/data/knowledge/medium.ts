export interface MediumArticle {
  readonly title: string;
  readonly excerpt: string;
  readonly readingTime: string;
  readonly date: string;
  readonly tags: readonly string[];
  readonly url: string;
  readonly claps?: number | undefined;
}

export interface MediumProfile {
  readonly name: string;
  readonly handle: string;
  readonly bio: string;
  readonly profileUrl: string;
  readonly articles: readonly MediumArticle[];
}

export const MEDIUM_PROFILE: MediumProfile = {
  name: "J Suhas",
  handle: "@jsuhas",
  bio: "Writing about distributed systems, system design, and building software that holds up under pressure.",
  profileUrl: "https://medium.com/@suhasjanardhan10",
  articles: [
    {
      title: "Rate Limiting at Scale: Token Bucket vs. Sliding Window Counter",
      excerpt:
        "When rate limiting fails at scale it's usually not the algorithm — it's the state storage. A deep dive into token buckets, sliding window counters, and what I've learned running both in production.",
      readingTime: "7 min",
      date: "Jun 2026",
      claps: 312,
      tags: ["system-design", "api-design", "backend"],
      url: "https://medium.com/@suhasjanardhan10",
    },
    {
      title: "Consistent Hashing Without the Hand-Waving",
      excerpt:
        "Most explanations of consistent hashing use diagrams that skip the hard part: what actually happens when you add a node, and how virtual nodes make the distribution uniform.",
      readingTime: "9 min",
      date: "May 2026",
      claps: 487,
      tags: ["distributed-systems", "databases", "algorithms"],
      url: "https://medium.com/@suhasjanardhan10",
    },
    {
      title: "What Nobody Tells You About Kafka Consumer Groups",
      excerpt:
        "Consumer group rebalancing is one of the most misunderstood parts of Kafka. Here's exactly what happens to your in-flight messages when a consumer joins or leaves a group.",
      readingTime: "8 min",
      date: "Apr 2026",
      claps: 256,
      tags: ["kafka", "distributed-systems", "event-streaming"],
      url: "https://medium.com/@suhasjanardhan10",
    },
  ],
};
