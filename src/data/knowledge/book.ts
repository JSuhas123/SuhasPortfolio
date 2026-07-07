export type ChapterStatus = "available" | "preview" | "coming-soon";
export type ChapterDifficulty = "beginner" | "intermediate" | "advanced";

export interface BookChapter {
  readonly number: number;
  readonly title: string;
  readonly difficulty: ChapterDifficulty;
  readonly estimatedMinutes: number;
  readonly status: ChapterStatus;
  readonly summary: string;
  readonly keyConcepts: readonly string[];
}

export interface BookData {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly status: "writing" | "review" | "published";
  readonly estimatedCompletion: string;
  readonly edition: string;
  readonly estimatedPages: number;
  readonly chapterCount: number;
  readonly estimatedReadingHours: number;
  readonly description: string;
  readonly targetAudience: readonly string[];
  readonly whatYouWillLearn: readonly string[];
  readonly whyWriting: string;
  readonly chapters: readonly BookChapter[];
}

export const DISTRIBUTED_SYSTEMS_BOOK: BookData = {
  slug: "distributed-systems",
  title: "Distributed Systems",
  subtitle: "Designing, Building, and Operating at Scale",
  status: "writing",
  estimatedCompletion: "2026",
  edition: "1st Edition",
  estimatedPages: 450,
  chapterCount: 18,
  estimatedReadingHours: 22,
  description:
    "A practical, engineering-focused guide to building systems that work correctly across multiple machines — from first principles to production patterns. Every concept is grounded in real implementation, real failure modes, and real trade-offs.",
  targetAudience: [
    "Software engineers moving from single-server to multi-node systems",
    "Backend engineers who want to understand the systems they rely on",
    "System design interview candidates who want depth, not just patterns",
    "Engineering managers who need to reason about distributed architectures",
  ],
  whatYouWillLearn: [
    "Why distributed systems fail and how to design for failure",
    "Consistency models and the real trade-offs behind CAP theorem",
    "How Kafka, Redis, PostgreSQL, and Cassandra make their design choices",
    "Rate limiting, load balancing, and traffic management at scale",
    "Database sharding, replication, and consensus algorithms",
    "Observability, tracing, and debugging distributed failures",
    "Security considerations unique to distributed environments",
  ],
  whyWriting:
    "Every book I found on distributed systems was either a research paper collection that lost engineers halfway through, or a surface-level 'system design interview' guide that skipped the hard parts. I wanted to write the book I needed when I was first building systems that ran across more than one machine — rigorous enough to actually teach you something, practical enough to be useful the next morning.",
  chapters: [
    {
      number: 1,
      title: "Introduction to Distributed Systems",
      difficulty: "beginner",
      estimatedMinutes: 45,
      status: "available",
      summary:
        "What makes a system 'distributed', why we build them, and why they're hard. This chapter establishes the vocabulary and mental model used throughout the book.",
      keyConcepts: [
        "Fallacies of Distributed Computing",
        "Network latency vs. failure",
        "The two fundamental problems: consistency and availability",
        "When distributed systems are worth the complexity",
      ],
    },
    {
      number: 2,
      title: "The Anatomy of a Distributed System",
      difficulty: "beginner",
      estimatedMinutes: 60,
      status: "preview",
      summary:
        "A tour of the components: nodes, networks, clocks, and state. Why clocks can't be trusted and what we use instead.",
      keyConcepts: [
        "Processes and nodes",
        "Physical vs. logical clocks",
        "Happened-before relationships",
        "Lamport timestamps",
      ],
    },
    {
      number: 3,
      title: "Network Fundamentals for Engineers",
      difficulty: "beginner",
      estimatedMinutes: 50,
      status: "preview",
      summary:
        "The parts of the network that matter for distributed systems engineers: TCP vs. UDP, packet loss, latency, and why 'the network is reliable' is the first fallacy.",
      keyConcepts: [
        "TCP reliability guarantees",
        "Timeouts and retries",
        "Head-of-line blocking",
        "Backpressure",
      ],
    },
    {
      number: 4,
      title: "CAP Theorem: The Real Trade-offs",
      difficulty: "intermediate",
      estimatedMinutes: 70,
      status: "coming-soon",
      summary:
        "A rigorous but practical treatment of CAP, PACELC, and what these theorems mean for everyday system design decisions.",
      keyConcepts: [
        "Partition tolerance is not optional",
        "CP vs. AP systems",
        "PACELC extension",
        "What Zookeeper, Cassandra, and DynamoDB chose",
      ],
    },
    {
      number: 5,
      title: "Consistency Models Explained",
      difficulty: "intermediate",
      estimatedMinutes: 80,
      status: "coming-soon",
      summary:
        "From eventual consistency to linearisability — the full spectrum, with concrete examples and the performance implications of each level.",
      keyConcepts: [
        "Eventual consistency",
        "Causal consistency",
        "Serialisability",
        "Linearisability",
        "Read-your-writes",
      ],
    },
    {
      number: 6,
      title: "Distributed Data Stores",
      difficulty: "intermediate",
      estimatedMinutes: 90,
      status: "coming-soon",
      summary:
        "How relational databases, document stores, and wide-column stores make their consistency choices — and when to use each.",
      keyConcepts: [
        "ACID vs. BASE",
        "PostgreSQL replication",
        "Cassandra and wide-column design",
        "DynamoDB and single-table design",
      ],
    },
    {
      number: 7,
      title: "Consensus Algorithms (Raft & Paxos)",
      difficulty: "advanced",
      estimatedMinutes: 120,
      status: "coming-soon",
      summary:
        "How distributed systems agree on a single value when nodes can fail. Paxos as the foundation, Raft as the practical implementation, and where both fall short.",
      keyConcepts: [
        "Leader election",
        "Log replication",
        "Safety and liveness",
        "Split-brain prevention",
        "Etcd and ZooKeeper internals",
      ],
    },
    {
      number: 8,
      title: "Event-Driven Architecture",
      difficulty: "intermediate",
      estimatedMinutes: 75,
      status: "coming-soon",
      summary:
        "Why event-driven systems decouple producers from consumers, the patterns for reliable event delivery, and where event sourcing fits.",
      keyConcepts: [
        "Event vs. command",
        "At-least-once delivery",
        "Idempotency keys",
        "Event sourcing",
        "CQRS",
      ],
    },
    {
      number: 9,
      title: "Apache Kafka in Production",
      difficulty: "advanced",
      estimatedMinutes: 95,
      status: "coming-soon",
      summary:
        "Kafka internals from the perspective of a producer and consumer. Partitioning strategy, consumer lag, and the trade-offs in exactly-once semantics.",
      keyConcepts: [
        "Log-structured storage",
        "Partition assignment and rebalancing",
        "Consumer lag and backpressure",
        "Exactly-once semantics",
        "Retention and compaction",
      ],
    },
    {
      number: 10,
      title: "Caching Strategies at Scale",
      difficulty: "intermediate",
      estimatedMinutes: 65,
      status: "coming-soon",
      summary:
        "Cache placement (client, server, distributed), eviction policies, and the hardest problem in caching: invalidation.",
      keyConcepts: [
        "Cache-aside vs. write-through",
        "LRU and LFU eviction",
        "Cache stampede and thundering herd",
        "Redis cluster topology",
      ],
    },
    {
      number: 11,
      title: "Rate Limiting and Traffic Management",
      difficulty: "intermediate",
      estimatedMinutes: 60,
      status: "coming-soon",
      summary:
        "Token bucket, leaky bucket, sliding window: when each is appropriate, implementation in distributed state stores, and managing shared limits across replicas.",
      keyConcepts: [
        "Token bucket algorithm",
        "Sliding window counter",
        "Distributed state for rate limiting",
        "Redis + Lua atomicity",
      ],
    },
    {
      number: 12,
      title: "Load Balancing Deep Dive",
      difficulty: "intermediate",
      estimatedMinutes: 70,
      status: "coming-soon",
      summary:
        "Layer 4 vs. Layer 7 load balancing, consistent hashing, power of two choices, and what happens when a server goes down mid-request.",
      keyConcepts: [
        "L4 vs. L7 load balancers",
        "Consistent hashing",
        "Power of two random choices",
        "Health checks and circuit breakers",
      ],
    },
    {
      number: 13,
      title: "Database Sharding Strategies",
      difficulty: "advanced",
      estimatedMinutes: 100,
      status: "coming-soon",
      summary:
        "Range partitioning vs. hash partitioning, hot shards, cross-shard queries, and resharding without downtime.",
      keyConcepts: [
        "Range vs. hash sharding",
        "Consistent hash ring",
        "Hot spots and re-sharding",
        "Vitess and Citus",
      ],
    },
    {
      number: 14,
      title: "Replication: Synchronous vs. Asynchronous",
      difficulty: "advanced",
      estimatedMinutes: 90,
      status: "coming-soon",
      summary:
        "Leader-follower, multi-leader, and leaderless replication. Conflict resolution, replication lag, and what 'eventual consistency' really means in practice.",
      keyConcepts: [
        "Statement-based vs. WAL replication",
        "Replication lag",
        "Multi-leader conflicts",
        "Conflict-free replicated data types (CRDTs)",
      ],
    },
    {
      number: 15,
      title: "Distributed Tracing and Observability",
      difficulty: "intermediate",
      estimatedMinutes: 75,
      status: "coming-soon",
      summary:
        "The three pillars of observability (metrics, logs, traces) applied to distributed systems. OpenTelemetry, trace propagation, and debugging cascading failures.",
      keyConcepts: [
        "Trace context propagation",
        "Sampling strategies",
        "OpenTelemetry",
        "Flame graphs and waterfall charts",
      ],
    },
    {
      number: 16,
      title: "Fault Tolerance and Circuit Breakers",
      difficulty: "intermediate",
      estimatedMinutes: 70,
      status: "coming-soon",
      summary:
        "Designing for partial failure: timeouts, retries, circuit breakers, bulkheads, and fallbacks. When to fail fast and when to retry.",
      keyConcepts: [
        "Timeout strategies",
        "Exponential backoff with jitter",
        "Circuit breaker states",
        "Bulkhead pattern",
        "Chaos engineering",
      ],
    },
    {
      number: 17,
      title: "Security in Distributed Systems",
      difficulty: "advanced",
      estimatedMinutes: 85,
      status: "coming-soon",
      summary:
        "The unique security challenges of distributed systems: mutual TLS, service identity, secrets management, and the threat model for multi-tenant architectures.",
      keyConcepts: [
        "mTLS and service mesh",
        "JWT and token validation at scale",
        "Secrets management (Vault, AWS SSM)",
        "Zero-trust networking",
      ],
    },
    {
      number: 18,
      title: "Case Studies: Systems You Use Daily",
      difficulty: "intermediate",
      estimatedMinutes: 110,
      status: "coming-soon",
      summary:
        "Walkthroughs of the architectural decisions behind systems like Kafka, Cassandra, DynamoDB, and Redis — applying everything from the previous 17 chapters.",
      keyConcepts: [
        "Kafka log architecture",
        "DynamoDB consistent hashing",
        "Redis single-threaded model",
        "Cassandra's gossip protocol",
      ],
    },
  ],
};

export function getBookBySlug(slug: string): BookData | null {
  if (slug === DISTRIBUTED_SYSTEMS_BOOK.slug) return DISTRIBUTED_SYSTEMS_BOOK;
  return null;
}
