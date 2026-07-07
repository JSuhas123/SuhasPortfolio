import type { SimulationDef } from "./types";

const SIMULATIONS: readonly SimulationDef[] = [
  {
    slug: "rate-limiter",
    title: "Rate Limiter",
    tagline: "Token bucket algorithm — control API request throughput",
    description:
      "Visualise how a token bucket rate limiter accepts or rejects requests. Adjust request rate, bucket capacity, and refill rate to observe burst handling and sustained throughput.",
    category: "api-design",
    difficulty: "beginner",
    estimatedMinutes: 8,
    tags: ["token-bucket", "throttling", "api-design", "rate-limiting"],
    problem:
      "Unthrottled APIs can be overwhelmed by bursts — bots, DDoS, or a single misconfigured client that retries aggressively. Without rate limiting, a single misbehaving caller can degrade service for everyone.",
    realWorldUse:
      "Every production API gateway (AWS API GW, Cloudflare, Nginx) implements rate limiting. Stripe uses per-customer limits to ensure fair access. GitHub enforces 5,000 requests/hour per authenticated token.",
    howItWorks:
      "A token bucket holds up to N tokens. Tokens refill at a fixed rate (R per second). Each request consumes one token. If the bucket is empty, the request is rejected immediately. A large bucket allows burst traffic; a low refill rate limits sustained throughput.",
    tradeoffs:
      "Token bucket allows short bursts above the sustained rate (good). It requires per-client state in Redis (memory cost). A fixed-window counter is simpler but allows edge-of-window bursts at 2× rate. Sliding window log is most accurate but most expensive.",
    whenToUse:
      "Public APIs, third-party integrations, any endpoint where a single client can monopolise resources.",
    whenNotToUse:
      "Internal service-to-service calls with predictable, trusted callers. Adding rate limiting there adds latency with little benefit.",
    relatedConcepts: [
      "Leaky Bucket",
      "Sliding Window Counter",
      "Fixed Window Counter",
      "Circuit Breaker",
    ],
    codeExample: {
      filename: "token-bucket.ts",
      language: "typescript",
      description: "A minimal production-grade token bucket implementation",
      code: `class TokenBucket {
  private tokens: number;
  private lastRefill = Date.now();

  constructor(
    private readonly capacity: number,
    private readonly refillRate: number, // tokens / second
  ) {
    this.tokens = capacity;
  }

  consume(count = 1): boolean {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true; // accepted
    }
    return false; // rejected — 429 Too Many Requests
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate,
    );
    this.lastRefill = now;
  }
}`,
    },
  },
  {
    slug: "load-balancer",
    title: "Load Balancer",
    tagline:
      "Round-robin, least connections — distributing traffic across servers",
    description:
      "Watch requests route to backend servers under different algorithms. Toggle server health, compare round-robin vs. least-connections, and observe what happens during a server failure.",
    category: "networking",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    tags: [
      "load-balancing",
      "round-robin",
      "least-connections",
      "health-checks",
    ],
    problem:
      "A single server has finite capacity. As traffic grows, you need to distribute requests across multiple instances. The routing algorithm determines how evenly load spreads — and how gracefully the system handles server failures.",
    realWorldUse:
      "AWS ALB, Nginx, HAProxy, Cloudflare. Every scaled web service runs behind a load balancer. Kubernetes Services implement round-robin by default across pod replicas.",
    howItWorks:
      "Round Robin cycles through servers sequentially — simple, stateless, but ignores server load. Least Connections routes to the server with the fewest active requests — better when requests have variable processing time. Health checks periodically probe servers and remove unhealthy ones from the rotation.",
    tradeoffs:
      "Round Robin is O(1) per decision but assumes equal server capacity and equal request duration. Least Connections is more adaptive but requires tracking active connections. Consistent Hash is useful for session affinity but complicates adding/removing servers.",
    whenToUse:
      "Any service with multiple identical backend instances. Essential at scale. Even 2 instances need a load balancer for zero-downtime deployments.",
    whenNotToUse:
      "Single-instance services. Stateful services where session state isn't shared — you need sticky sessions or shared state (Redis) first.",
    relatedConcepts: [
      "Consistent Hashing",
      "Service Mesh",
      "Circuit Breaker",
      "Health Checks",
      "Session Affinity",
    ],
    codeExample: {
      filename: "load-balancer.ts",
      language: "typescript",
      description:
        "Round-robin and least-connections algorithms with health checks",
      code: `interface Server {
  id: string;
  healthy: boolean;
  activeConnections: number;
}

class RoundRobinBalancer {
  private cursor = 0;

  next(servers: Server[]): Server | null {
    const healthy = servers.filter((s) => s.healthy);
    if (healthy.length === 0) return null;
    const server = healthy[this.cursor % healthy.length];
    this.cursor = (this.cursor + 1) % healthy.length;
    return server ?? null;
  }
}

class LeastConnectionsBalancer {
  next(servers: Server[]): Server | null {
    return (
      servers
        .filter((s) => s.healthy)
        .sort((a, b) => a.activeConnections - b.activeConnections)
        .at(0) ?? null
    );
  }
}`,
    },
  },
  {
    slug: "distributed-cache",
    title: "Distributed Cache",
    tagline: "LRU eviction, TTL, hit rates — caching in front of your database",
    description:
      "Observe cache hits, misses, and evictions as requests flow through. Adjust cache size and TTL to maximise hit rate while avoiding stale data. Watch LRU eviction in action as the cache fills.",
    category: "caching",
    difficulty: "intermediate",
    estimatedMinutes: 10,
    tags: ["redis", "lru", "ttl", "cache-hit", "eviction", "caching"],
    problem:
      "Database reads are slow (1-10ms). At scale, most reads are for the same hot keys — popular products, active user profiles, trending content. Without caching, your database becomes the bottleneck even with good indexes.",
    realWorldUse:
      "Redis sits in front of virtually every high-traffic database. Stripe caches charge objects. Twitter cached timelines. At 1M req/s, even a 90% cache hit rate saves 900k database reads per second.",
    howItWorks:
      "A cache stores key-value pairs in fast memory. On a read, if the key exists and hasn't expired (TTL), return it — that's a cache hit. On a miss, read from the database, store in cache, return to client. LRU eviction removes the least-recently-used entry when capacity is full.",
    tradeoffs:
      "Cache improves read performance dramatically but introduces staleness (cache != DB for TTL duration). Cache invalidation on write is the hard problem. Write-through keeps cache consistent but doubles write latency. Write-behind is faster but risks data loss.",
    whenToUse:
      "Read-heavy workloads. Data that's expensive to compute or query. Data with natural TTL (sessions, price quotes). When database read latency is a bottleneck.",
    whenNotToUse:
      "Write-heavy workloads where every write invalidates cached data. Data where staleness is intolerable (financial balances, inventory counts). Very large values that exceed memory budget.",
    relatedConcepts: [
      "LFU Eviction",
      "Write-Through Cache",
      "Cache Stampede",
      "CDN",
      "Bloom Filter",
    ],
    codeExample: {
      filename: "lru-cache.ts",
      language: "typescript",
      description:
        "LRU cache with TTL using a doubly-linked list + Map for O(1) operations",
      code: `interface CacheEntry<V> {
  value: V;
  expiresAt: number;
}

class LRUCache<K, V> {
  private readonly map = new Map<K, CacheEntry<V>>();

  constructor(
    private readonly capacity: number,
    private readonly ttlMs: number,
  ) {}

  get(key: K): V | null {
    const entry = this.map.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.map.delete(key);
      return null; // TTL expired — treat as miss
    }
    // Move to end (most recently used)
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V): void {
    this.map.delete(key); // refresh position
    if (this.map.size >= this.capacity) {
      // Evict least recently used (first entry in Map)
      const lruKey = this.map.keys().next().value;
      if (lruKey !== undefined) this.map.delete(lruKey);
    }
    this.map.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}`,
    },
  },
  {
    slug: "kafka-streaming",
    title: "Kafka Event Streaming",
    tagline: "Producers, partitions, consumer groups — event-driven at scale",
    description:
      "Watch messages flow from producers through topic partitions to multiple consumer groups. Observe offset tracking, consumer lag, and how partition count affects parallelism.",
    category: "distributed-systems",
    difficulty: "advanced",
    estimatedMinutes: 15,
    tags: [
      "kafka",
      "events",
      "partitions",
      "consumers",
      "offsets",
      "backpressure",
    ],
    problem:
      "In microservices, services need to communicate without tight coupling. Direct RPC creates brittle dependencies — if the downstream is slow or down, the upstream blocks. An event log decouples producers from consumers: the producer writes and moves on; consumers process at their own pace.",
    realWorldUse:
      "LinkedIn uses Kafka for activity tracking (1.4T messages/day). Uber for real-time trip events. Every major fintech for payment event streams. Kafka is the de-facto standard for high-throughput event streaming.",
    howItWorks:
      "A producer publishes messages to a topic. Topics are divided into partitions. Kafka appends each message to the end of a partition — immutable, ordered within the partition. Consumer groups subscribe to the topic; each partition is assigned to exactly one consumer in the group, enabling parallel processing. Offsets track how far each consumer group has read.",
    tradeoffs:
      "Kafka guarantees ordering only within a partition. If you need global ordering, you must use a single partition — eliminating parallelism. Consumer lag (unconsumed messages) is healthy in bursts but indicates a problem if it grows unbounded. Partition count is fixed at topic creation — rebalancing is expensive.",
    whenToUse:
      "Event sourcing, audit logs, real-time analytics, decoupling microservices, data pipelines, change data capture (CDC) from databases.",
    whenNotToUse:
      "Simple point-to-point RPC between two services. Low-volume, low-latency transactional operations where the messaging overhead exceeds the benefit. When you need exactly-once delivery without exactly-once semantics configured.",
    relatedConcepts: [
      "Event Sourcing",
      "CQRS",
      "RabbitMQ",
      "Change Data Capture",
      "Backpressure",
      "Dead Letter Queue",
    ],
    codeExample: {
      filename: "kafka-producer.ts",
      language: "typescript",
      description:
        "Kafka producer with partition key for ordered delivery within a category",
      code: `import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({ brokers: ["kafka:9092"] });
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

interface OrderEvent {
  orderId: string;
  customerId: string; // used as partition key
  type: "created" | "paid" | "shipped" | "delivered";
  payload: Record<string, unknown>;
}

async function publishOrderEvent(event: OrderEvent): Promise<void> {
  await producer.send({
    topic: "order-events",
    messages: [
      {
        // All events for the same customer go to the same partition
        // → ordered processing per customer
        key: event.customerId,
        value: JSON.stringify(event),
        headers: { eventType: event.type },
      },
    ],
  });
}`,
    },
  },
  {
    slug: "airport-scheduling",
    title: "Airport Scheduling",
    tagline:
      "Priority queues, runways as resources — real-time constraint scheduling",
    description:
      "Aircraft queue for two runways under a priority scheduler. Trigger an emergency landing to watch priority preemption. Observe how arrival rate and runway count affect queue length and delay.",
    category: "algorithms",
    difficulty: "advanced",
    estimatedMinutes: 12,
    tags: [
      "scheduling",
      "priority-queue",
      "resource-allocation",
      "preemption",
      "optimization",
    ],
    problem:
      "Runways are scarce resources. Multiple aircraft compete for a runway simultaneously. Emergency aircraft must land immediately. Delayed aircraft waste fuel. The goal is to maximise throughput while minimising delay and handling priority correctly.",
    realWorldUse:
      "Airport CDM (Collaborative Decision Making) systems use similar algorithms. FCFS (First Come First Served) is the naive baseline — real systems use AMAN (Arrival MANager) with priority scoring. The same problem structure appears in OS process scheduling and print queues.",
    howItWorks:
      "Aircraft arrive in a queue with an assigned priority (emergency > critical fuel > scheduled > delayed). A scheduler assigns the highest-priority aircraft to the next available runway. Each aircraft occupies the runway for a fixed service time. If a runway is busy, the aircraft waits.",
    tradeoffs:
      "Pure priority scheduling causes starvation — low-priority aircraft may wait indefinitely if high-priority ones keep arriving. Aging (gradually increasing priority with wait time) prevents starvation. Preemptive scheduling (aborting a takeoff for an emergency landing) improves safety but wastes runway throughput.",
    whenToUse:
      "Any system with heterogeneous priority tasks competing for a finite resource: print queues, CPU scheduling, network packet queuing, hospital triage.",
    whenNotToUse:
      "Homogeneous workloads where FIFO is fair and simple. Workloads where starvation of low-priority tasks is unacceptable and aging isn't implemented.",
    relatedConcepts: [
      "Priority Queue",
      "Preemptive Scheduling",
      "Starvation & Aging",
      "Round Robin",
      "FCFS",
      "CFS (Linux Kernel)",
    ],
    codeExample: {
      filename: "priority-scheduler.ts",
      language: "typescript",
      description: "Priority queue scheduler with aging to prevent starvation",
      code: `type Priority = "emergency" | "critical" | "scheduled" | "delayed";

const PRIORITY_SCORE: Record<Priority, number> = {
  emergency: 1000,
  critical: 100,
  scheduled: 10,
  delayed: 1,
};

interface Aircraft {
  id: string;
  priority: Priority;
  waitSince: number; // timestamp
}

function scoreAircraft(aircraft: Aircraft, now: number): number {
  const baseScore = PRIORITY_SCORE[aircraft.priority];
  const waitSeconds = (now - aircraft.waitSince) / 1000;
  // Aging: +1 point per second waiting — prevents starvation
  const ageBonus = waitSeconds * 0.5;
  return baseScore + ageBonus;
}

function selectNext(queue: Aircraft[]): Aircraft | null {
  if (queue.length === 0) return null;
  const now = Date.now();
  return queue
    .map((a) => ({ aircraft: a, score: scoreAircraft(a, now) }))
    .sort((a, b) => b.score - a.score)
    .at(0)?.aircraft ?? null;
}`,
    },
  },
  {
    slug: "database-sharding",
    title: "Database Sharding",
    tagline:
      "Consistent hashing, shard routing — horizontal scaling of databases",
    description:
      "Route queries to shards using consistent hashing. Add and remove shards to see how data redistributes. Observe hotspot formation and how key design affects shard balance.",
    category: "databases",
    difficulty: "advanced",
    estimatedMinutes: 12,
    tags: [
      "sharding",
      "consistent-hashing",
      "horizontal-scaling",
      "routing",
      "replication",
    ],
    problem:
      "A single database can only scale so far vertically (bigger machines). Horizontal sharding distributes data across multiple database instances. The challenge: given a key, which shard holds that data? And how do you add or remove shards without moving all the data?",
    realWorldUse:
      "MongoDB, Cassandra, DynamoDB, and Vitess (MySQL sharding) all use consistent hashing. Discord shards user data across PostgreSQL instances. Stripe shards its payment data by customer ID to maintain sub-10ms query times at 100M+ customers.",
    howItWorks:
      "A hash function maps each key to a position on a virtual ring (0 to 2³²). Each shard owns a contiguous arc of the ring. To find a key's shard, hash the key, walk clockwise on the ring until you hit a shard boundary. Adding a shard only redistributes the data in the arc it takes over.",
    tradeoffs:
      "Consistent hashing minimises reshuffling when adding/removing shards (only ~K/N keys move, where K=keys and N=shards). Range queries (all users with IDs 1000-2000) are inefficient — they may span multiple shards. Cross-shard joins require application-level gathering.",
    whenToUse:
      "When a single database instance can no longer handle the write throughput or storage volume. Typically triggered at >10M rows or >10k writes/second.",
    whenNotToUse:
      "Small datasets that fit comfortably in one instance. Workloads with frequent cross-shard transactions — the coordination overhead negates the scaling benefit. Consider read replicas + vertical scaling first.",
    relatedConcepts: [
      "Consistent Hashing",
      "Virtual Nodes",
      "Read Replicas",
      "CQRS",
      "Two-Phase Commit",
      "Saga Pattern",
    ],
    codeExample: {
      filename: "consistent-hash.ts",
      language: "typescript",
      description: "Consistent hash ring for shard routing",
      code: `import { createHash } from "crypto";

function hash(key: string): number {
  const hex = createHash("md5").update(key).digest("hex");
  return parseInt(hex.slice(0, 8), 16); // 32-bit value
}

class ConsistentHashRing {
  // shardId → array of virtual node positions on the ring
  private readonly ring = new Map<string, number[]>();
  private readonly sortedPositions: number[] = [];

  addShard(shardId: string, virtualNodes = 150): void {
    const positions: number[] = [];
    for (let i = 0; i < virtualNodes; i++) {
      const pos = hash(\`\${shardId}-vnode-\${i}\`);
      positions.push(pos);
      this.sortedPositions.push(pos);
      // ... (store pos→shardId mapping)
    }
    this.ring.set(shardId, positions);
    this.sortedPositions.sort((a, b) => a - b);
  }

  getShard(key: string): string {
    const pos = hash(key);
    // Walk clockwise to find the first shard boundary ≥ pos
    const idx = this.sortedPositions.findIndex((p) => p >= pos);
    const ringPos =
      idx === -1
        ? this.sortedPositions[0] // wrap around
        : this.sortedPositions[idx];
    // Lookup which shard owns this position
    return this.positionToShard(ringPos ?? 0);
  }

  private positionToShard(_pos: number): string {
    // ... reverse lookup implementation
    return "shard-0";
  }
}`,
    },
  },
];

export function getAllSimulations(): readonly SimulationDef[] {
  return SIMULATIONS;
}

export function getSimulationBySlug(slug: string): SimulationDef | null {
  return SIMULATIONS.find((s) => s.slug === slug) ?? null;
}

export function getAllSimulationSlugs(): readonly string[] {
  return SIMULATIONS.map((s) => s.slug);
}

export function getSimulationsByCategory(
  category: SimulationDef["category"],
): readonly SimulationDef[] {
  return SIMULATIONS.filter((s) => s.category === category);
}

export type { SimulationDef };
