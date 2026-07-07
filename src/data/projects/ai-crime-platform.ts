import type { ProjectData } from "./types";

export const AI_CRIME_PLATFORM: ProjectData = {
  slug: "ai-crime-platform",
  title: "AI Crime Intelligence Platform",
  tagline:
    "Turning 4-hour manual analysis cycles into 12-minute automated intelligence",
  description:
    "A full-stack intelligence platform for law enforcement analytics. Aggregates data across CAD, RMS, and external sources, applies ML-based pattern detection, and surfaces predictive insights for investigative teams.",
  status: "completed",
  featured: true,
  complexity: "critical",
  timeline: "Oct 2022 – Aug 2023",
  date: "2023-08-01",
  tags: [
    "python",
    "ml",
    "fastapi",
    "react",
    "postgresql",
    "redis",
    "kubernetes",
  ],

  problem:
    "Law enforcement analysts at a metropolitan department spent 70-80% of their working hours manually pulling data from seven disconnected systems — CAD, RMS, court records, parole databases, social media monitoring tools — and assembling it into Excel spreadsheets. By the time a pattern analysis was complete, the intelligence was 4-6 hours stale. Pattern detection was entirely dependent on individual analyst experience and institutional memory.",

  background:
    "This project originated from a research engagement with a metropolitan police department of 1,400 officers. Their analytical unit of 12 analysts was producing roughly 3 pattern briefs per week, despite having access to 2.3M historical incident records. The RMS (Record Management System) vendor had a reporting module, but it couldn't cross-reference across data sources or apply statistical methods. The unit commander described it as 'trying to do surgery with kitchen knives.' We embedded with the analytical unit for six weeks before writing a line of code.",

  goals: [
    "Reduce end-to-end analysis time from hours to under 15 minutes",
    "Enable real-time pattern detection across incidents, locations, and subjects",
    "Maintain legally defensible data chain-of-custody for evidence",
    "Support multi-agency deployment from a single platform with data isolation",
    "Achieve >90% pattern detection accuracy validated against historical ground truth",
  ],

  requirements: [
    {
      type: "functional",
      title: "Incident ingestion pipeline",
      description:
        "Ingest from CAD, RMS, court records, and external feeds in near-real-time with idempotent processing.",
    },
    {
      type: "functional",
      title: "Spatial pattern detection",
      description:
        "Identify geographic clusters of incidents using configurable temporal windows and radius thresholds.",
    },
    {
      type: "functional",
      title: "Subject network analysis",
      description:
        "Build co-offender and associate graphs with configurable relationship depth.",
    },
    {
      type: "functional",
      title: "Predictive risk scoring",
      description:
        "Score locations and known subjects for near-term risk based on historical patterns.",
    },
    {
      type: "nonfunctional",
      title: "Data isolation",
      description:
        "Complete tenant isolation — Agency A cannot read Agency B's data at any layer.",
    },
    {
      type: "nonfunctional",
      title: "Inference latency",
      description:
        "ML inference must complete within 500ms for interactive analysis queries.",
    },
    {
      type: "nonfunctional",
      title: "Audit trail",
      description:
        "Every data access must be logged with analyst identity, timestamp, and purpose.",
    },
  ],

  architecture: {
    overview:
      "Event-driven microservices with a dedicated ML inference layer. Data flows through a four-stage pipeline: ingestion → normalization → enrichment → inference. The query API serves the frontend independently from the pipeline.",
    details:
      "The ingestion service polls seven source systems on configurable intervals and publishes normalized events to a Kafka topic. A normalization worker reads from Kafka, applies deduplication (fuzzy name matching + geolocation hash), and writes canonical incident records to PostgreSQL.\n\nEnrichment workers process background jobs: geocoding, subject record matching, associate graph updates. The ML inference service is isolated — it reads from a read replica and never writes to the primary. Redis caches inference results with TTLs keyed to data freshness.\n\nThe FastAPI gateway handles authn/authz and routes queries to either the database layer (structured queries) or the ML service (pattern analysis). The React frontend communicates exclusively through this gateway.",
    diagramType: "flow",
    diagramCaption:
      "Four-stage event-driven pipeline from source ingestion to inference API",
  },

  techStack: [
    {
      name: "Python / FastAPI",
      category: "backend",
      reason:
        "High throughput async I/O, Pydantic models for data validation, and the ML ecosystem lives in Python.",
    },
    {
      name: "React + TypeScript",
      category: "frontend",
      reason:
        "Component model suits the dashboard's complex interactive state. TypeScript caught 40+ bugs during development.",
    },
    {
      name: "PostgreSQL 15",
      category: "database",
      reason:
        "ACID compliance essential for chain-of-custody. Complex multi-table joins for associate networks. Mature ecosystem.",
    },
    {
      name: "Redis",
      category: "database",
      reason:
        "Sub-millisecond inference result caching. Pub/sub for real-time dashboard updates.",
    },
    {
      name: "Apache Kafka",
      category: "infrastructure",
      reason:
        "Durable event log enables replay on pipeline failure. Decouples ingestion rate from processing rate.",
    },
    {
      name: "TensorFlow / Scikit-learn",
      category: "ml",
      reason:
        "TF for risk scoring models (LSTM over time-series), sklearn for clustering (DBSCAN) and classification.",
    },
    {
      name: "Kubernetes + Helm",
      category: "infrastructure",
      reason:
        "Independent scaling of ML inference pods (GPU) vs CRUD pods (CPU). Namespace-level tenant isolation.",
    },
    {
      name: "Celery + Redis",
      category: "backend",
      reason:
        "Async background jobs for enrichment. Beat scheduler for periodic ingestion polling.",
    },
  ],

  decisions: [
    {
      decision: "PostgreSQL over MongoDB",
      context:
        "The data model involves complex relationships: incidents link to subjects, locations, evidence items, and court records. Queries like 'find all incidents involving Subject A and anyone in his associate network within 500m of Location B in the last 30 days' need multi-join capability.",
      alternatives: ["MongoDB", "Neo4j (graph database)"],
      rationale:
        "PostgreSQL's recursive CTEs handle associate network traversal. JSONB columns accommodate the varying schema of source systems without losing relational integrity. The legal requirement for chain-of-custody ruled out eventually-consistent stores.",
      tradeoffs:
        "Schema migrations are heavier than document stores. Solved with Alembic and blue/green deployment. Graph queries beyond 3 hops are slow — we cache computed graphs in Redis.",
      outcome:
        "Correct choice. The complex analytical queries would have been application-layer joins in MongoDB, which would've been dramatically slower and harder to audit.",
    },
    {
      decision: "Custom ML pipeline over vendor API",
      context:
        "AWS Rekognition and Google Vision could've handled image analysis, and Azure Cognitive Services offered entity extraction. Vendor APIs would have reduced build time by 8-10 weeks.",
      alternatives: [
        "AWS Rekognition + Comprehend",
        "Azure Cognitive Services",
        "Hybrid (vendor + custom)",
      ],
      rationale:
        "Criminal intelligence data contains PII, sealed case information, and juvenile records. Legal constraints under state statutes and federal law prohibited sending this data to third-party APIs. Custom pipeline was not optional.",
      tradeoffs:
        "8 additional weeks of ML engineering. Ongoing maintenance burden for model retraining. Required hiring an ML engineer mid-project.",
      outcome:
        "Mandatory given legal constraints. The 60% lower operating cost compared to vendor APIs was a secondary benefit.",
    },
    {
      decision: "Microservices over monolith",
      context:
        "The ML inference service (GPU-intensive, spiky load) and the CRUD API (CPU-bound, steady load) have completely different scaling characteristics. The ingestion workers also need independent scaling during high-volume periods.",
      alternatives: [
        "Django monolith",
        "Modular monolith with internal boundaries",
      ],
      rationale:
        "GPU nodes are expensive — you need exactly the right number online at the right time. Kubernetes allows the inference pods to scale from 1 to 12 in under 60 seconds based on queue depth.",
      tradeoffs:
        "Significant operational complexity. Distributed tracing (Jaeger) was required from day one. Network latency between services added ~15ms overhead per request.",
      outcome:
        "Justified. Inference service autoscales aggressively during shift-change query spikes. 45% lower infrastructure cost than static allocation.",
    },
  ],

  challenges: [
    {
      title: "Data quality was catastrophically bad",
      description:
        "40% of ingested records required significant normalization. Common issues: same person appearing as 'John Smith', 'SMITH, JOHN', 'J. Smith', and 'Jon Smyth' across systems. Address formats from four decades of different dispatch operators. Null coordinates for 18% of incidents.",
      resolution:
        "Built a fuzzy matching pipeline using phonetic encoding (Soundex + Metaphone), string similarity (Jaro-Winkler), and address normalization via USPS API. Introduced a 'confidence score' on entity matches that required human review below 0.85. Data quality issues consumed 5 of the 10 project months.",
    },
    {
      title: "Model bias amplifying systemic enforcement patterns",
      description:
        "Initial risk models showed dramatically elevated scores for neighborhoods with historically high patrol density. The model learned enforcement patterns, not crime patterns. Showing high-patrol areas as 'high risk' would cause additional patrolling, creating a feedback loop.",
      resolution:
        "Added bias detection metrics to the model evaluation pipeline. Introduced patrol-density as a confounding variable that the model explicitly decorrelates from. Implemented fairness constraints in the risk scorer. Delay of 6 weeks to retrain and validate. This is still an active area of monitoring.",
    },
    {
      title: "Real-time inference at <500ms with cold models",
      description:
        "LSTM models take 800-1200ms to load from disk. With unpredictable query patterns, cold-start latency violated SLAs 30% of the time in testing.",
      resolution:
        "Implemented warm pool: minimum 2 inference pods always loaded. Predictive pre-warming based on shift change patterns (queries spike at 08:00, 16:00, and 00:00). Redis caching of inference results with 15-minute TTL for repeated queries. P99 latency: 340ms.",
    },
  ],

  implementation: {
    overview:
      "The project shipped in three stages. Stage 1 (months 1-4): ingestion pipeline and basic query API. Stage 2 (months 5-7): ML models and pattern detection. Stage 3 (months 8-10): multi-agency support and production hardening. Each stage shipped to the analytical unit for feedback before the next began.",
    highlights: [
      "Idempotent ingestion pipeline using event sourcing — replaying any time window produces identical results",
      "Spatial clustering uses DBSCAN with haversine distance metric, tuned per crime category",
      "Audit logging middleware intercepts every DB read, not just writes — legally required",
      "ML model versioning with A/B testing infrastructure for safe rollouts",
      "Automated bias metrics computed on every model deployment in CI",
    ],
    codeSnippets: [
      {
        filename: "incident_pattern_detector.py",
        language: "python",
        description:
          "Spatial incident clustering using DBSCAN with haversine distance metric",
        code: `from sklearn.cluster import DBSCAN
import numpy as np
from typing import List

EARTH_RADIUS_KM = 6371.0

def detect_spatial_patterns(
    incidents: List[dict],
    radius_km: float = 0.5,
    min_samples: int = 3
) -> List[dict]:
    """
    Detect geographic incident clusters using DBSCAN.
    Uses haversine metric for accurate distance on spherical earth.
    """
    if not incidents:
        return []

    coords = np.array([[i["lat"], i["lng"]] for i in incidents])
    coords_rad = np.radians(coords)

    db = DBSCAN(
        eps=radius_km / EARTH_RADIUS_KM,
        min_samples=min_samples,
        algorithm="ball_tree",
        metric="haversine",
    ).fit(coords_rad)

    clusters: List[dict] = []
    unique_labels = set(db.labels_) - {-1}  # -1 = noise points

    for label in unique_labels:
        mask = db.labels_ == label
        cluster_incidents = [i for i, m in zip(incidents, mask) if m]
        centroid = coords[mask].mean(axis=0).tolist()
        clusters.append({
            "id": int(label),
            "incidents": cluster_incidents,
            "centroid": centroid,
            "size": int(mask.sum()),
            "severity_score": sum(i.get("severity", 1) for i in cluster_incidents),
        })

    return sorted(clusters, key=lambda c: c["size"], reverse=True)`,
      },
    ],
  },

  metrics: [
    {
      label: "Analysis time",
      value: "12 min",
      unit: "avg",
      description: "Down from 4+ hours (95% reduction)",
      highlighted: true,
    },
    {
      label: "Pattern accuracy",
      value: "94.2%",
      description: "Validated against 6-month ground truth holdout",
      highlighted: true,
    },
    {
      label: "Agencies deployed",
      value: "12",
      description: "Three states, one federal task force",
    },
    {
      label: "Incidents processed",
      value: "2.3M+",
      description: "Total historical + live",
    },
    {
      label: "False positive rate",
      value: "3.8%",
      description: "Risk alerts requiring analyst dismissal",
    },
    {
      label: "System uptime",
      value: "99.94%",
      description: "18-month production window",
    },
    {
      label: "Inference P99",
      value: "340ms",
      description: "From query submission to result",
    },
    {
      label: "Cost reduction",
      value: "60%",
      description: "vs. vendor ML API pricing at equivalent volume",
    },
  ],

  performance: {
    summary:
      "Query performance is the hardest constraint — analysts can't wait for answers. P99 latency improved from 1,400ms in early testing to 340ms in production through caching, query optimization, and warm-pool model management.",
    details: [
      "PostgreSQL query plans optimized with EXPLAIN ANALYZE; composite indexes on (agency_id, incident_type, occurred_at)",
      "DBSCAN spatial queries pre-materialized for common radius/temporal combinations",
      "Redis cache hit rate: 71% (reduces ML inference load by 3x during shift changes)",
      "Celery workers autoscale from 4 to 32 based on queue depth during high-ingestion periods",
    ],
  },

  lessons: [
    {
      type: "mistake",
      title: "We wrote the ML models before understanding the domain",
      description:
        "Spent 3 weeks building a recidivism predictor before realizing the analysts didn't use that concept. They cared about location patterns and associate networks. Embedded domain knowledge destroyed and replaced a sprint of work.",
    },
    {
      type: "insight",
      title: "Data pipelines are 80% of ML projects",
      description:
        "The machine learning models took 3 weeks to build. The ETL pipeline, normalization, deduplication, and data quality infrastructure took 5 months. This ratio held across every similar project I've encountered since.",
    },
    {
      type: "insight",
      title: "Domain experts are irreplaceable",
      description:
        "Hiring two former detectives as consultants for 8 weeks completely changed the data model, the UI organization, and three core algorithms. They knew which data fields were trustworthy, which were often wrong, and how analysts actually reason.",
    },
    {
      type: "mistake",
      title: "Deploying a biased model to production",
      description:
        "The first production deployment had the geographic bias problem. We caught it through an internal audit 6 weeks after go-live, not from automated monitoring. Added fairness metrics to CI after this.",
    },
    {
      type: "win",
      title: "Event sourcing made debugging trivial",
      description:
        "Because the ingestion pipeline is event-sourced, when a bug introduced incorrect normalization in month 4, we replayed the affected time window and corrected all downstream records in 2 hours. Without event sourcing, it would have required manual correction of ~8,000 records.",
    },
  ],

  improvements: [
    "Federated learning across agencies to improve models without sharing raw data",
    "Natural language interface for analysts who don't know the query syntax",
    "Automated bias monitoring dashboard with alerting",
    "Mobile application for field detectives",
    "Video surveillance integration (requires significant privacy framework work)",
  ],

  links: [
    { type: "github", label: "Platform (private)", url: "#" },
    { type: "paper", label: "Research paper (pending)", url: "#" },
  ],
  relatedProjects: ["airport-optimization"],
};
