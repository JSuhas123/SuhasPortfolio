import type { ProjectData } from "./types";

export const AIRPORT_OPTIMIZATION: ProjectData = {
  slug: "airport-optimization",
  title: "Airport Optimization System",
  tagline:
    "Reducing gate conflicts from 3.4 to 0.2 per day with constraint-based scheduling",
  description:
    "A real-time resource allocation and scheduling optimization engine for airport operations. Solves gate assignments, ground crew scheduling, and delay cascade prediction as a continuous constraint satisfaction problem.",
  status: "completed",
  featured: true,
  complexity: "critical",
  timeline: "Mar 2023 – Jan 2024",
  date: "2024-01-15",
  tags: [
    "python",
    "or-tools",
    "next.js",
    "websockets",
    "postgresql",
    "kafka",
    "optimization",
  ],

  problem:
    "Large airports handle 500-900 daily flights. Gate assignments, crew scheduling, and resource allocation are managed manually or through software built in the 1980s. A single 20-minute delay cascades into 10-15 affected downstream flights. The airport authority reported 3-4 gate conflicts daily — moments where two aircraft are scheduled for the same gate simultaneously — requiring expensive aircraft tows at $2,000-5,000 each. Total annual delay cost in the industry exceeds $8B.",

  background:
    "This project was initiated after a regional airport authority contacted the research group following a particularly bad summer: 847 gate conflicts in 90 days. Their existing scheduling tool was an Oracle Forms application from 1997, modified over 27 years into something nobody fully understood. The system had no optimization; it was a scheduling calendar that enforced uniqueness constraints and nothing more.\n\nWe were given access to 3 years of historical flight data (2.1M flights), the gate compatibility matrix, ground crew shift schedules, and FAA SWIM (System Wide Information Management) feed access for real-time flight data. The project took 10 months.",

  goals: [
    "Eliminate gate conflicts — target <1 per week",
    "Reduce average aircraft delay by at least 15%",
    "Increase average gate utilization from 74% toward 85%+",
    "Process the full daily schedule optimization in under 5 seconds",
    "Handle real-time re-optimization within 150ms when a flight's status changes",
  ],

  requirements: [
    {
      type: "functional",
      title: "Constraint-based gate assignment",
      description:
        "Assign all daily flights to compatible gates with no temporal overlap, respecting aircraft type constraints.",
    },
    {
      type: "functional",
      title: "Real-time re-optimization",
      description:
        "When a flight delays, advances, or diverts, re-optimize the affected time window within 150ms.",
    },
    {
      type: "functional",
      title: "Delay cascade prediction",
      description:
        "Identify knock-on effects of a delay and surface them before they become conflicts.",
    },
    {
      type: "functional",
      title: "Ground crew scheduling",
      description:
        "Allocate turnaround crews (cleaning, fuel, catering) to flights respecting shift and certification constraints.",
    },
    {
      type: "nonfunctional",
      title: "Full-day optimization runtime",
      description:
        "Complete schedule optimization for 600 flights must complete in under 5 seconds.",
    },
    {
      type: "nonfunctional",
      title: "Real-time event throughput",
      description:
        "Process 15,000+ FAA SWIM events per hour at peak without message loss.",
    },
  ],

  architecture: {
    overview:
      "Three-tier architecture: event ingestion (Kafka + SWIM consumer), optimization engine (OR-Tools constraint solver exposed via FastAPI), and live dashboard (Next.js + WebSocket). Pre-computation nightly, real-time refinement on flight updates.",
    details:
      "The core is a Mixed-Integer Linear Program (MILP) implemented with Google OR-Tools CP-SAT solver. The daily schedule is compiled into a constraint model at 23:00 for the following day, solving the full assignment problem with a 10-second time budget. This produces a near-optimal baseline assignment.\n\nDuring the operational day, the real-time re-optimization service maintains a live model snapshot. When a flight status changes (FAA SWIM → Kafka → consumer → re-optimizer), it extracts the affected time window (the delayed flight ± 2 hours at the affected gate), solves the local sub-problem with a 100ms budget, and publishes delta updates via WebSocket.\n\nThe key insight: full global re-optimization is too expensive for real-time. Local sub-problem re-optimization (50-80 flights instead of 600) completes in 40-90ms with equivalent quality.",
    diagramType: "flow",
    diagramCaption:
      "Event ingestion through constraint solving to live dashboard delivery",
  },

  techStack: [
    {
      name: "Python + OR-Tools",
      category: "backend",
      reason:
        "Google OR-Tools CP-SAT solver handles MILP natively. Python bindings are mature and well-documented.",
    },
    {
      name: "FastAPI",
      category: "backend",
      reason:
        "Async I/O for WebSocket connections to the dashboard, sync for the solver (CPU-bound).",
    },
    {
      name: "Next.js 14 (App Router)",
      category: "frontend",
      reason:
        "Server components for the static schedule display; client components only where real-time updates are needed.",
    },
    {
      name: "WebSockets",
      category: "frontend",
      reason:
        "Push-based updates for the live dashboard. Polling at the required refresh rate (2s) would generate 1.8M requests/day.",
    },
    {
      name: "Apache Kafka",
      category: "infrastructure",
      reason:
        "FAA SWIM produces a firehose of events. Kafka buffers spikes and ensures no events are dropped during re-optimization.",
    },
    {
      name: "PostgreSQL + TimescaleDB",
      category: "database",
      reason:
        "PostgreSQL for schedule data; TimescaleDB extension for efficient time-series queries on historical delay data.",
    },
    {
      name: "Redis",
      category: "database",
      reason:
        "Cached current schedule state for the re-optimizer — reading from Postgres on every update would be too slow.",
    },
  ],

  decisions: [
    {
      decision: "MILP solver over heuristics",
      context:
        "Gate assignment is NP-hard. Heuristics (greedy, simulated annealing) can produce good solutions quickly but can't prove optimality or reliably handle complex constraint interactions.",
      alternatives: [
        "Greedy assignment (first-fit)",
        "Simulated annealing",
        "Genetic algorithm",
      ],
      rationale:
        "Correctness matters more than marginal speed. A suboptimal assignment that creates a conflict 6 hours later costs $3,000-15,000 in towing and delay fees. OR-Tools CP-SAT finds provably optimal solutions for the 600-flight daily problem in 2.3 seconds average.",
      tradeoffs:
        "More complex to model than greedy approaches. Required 3 weeks learning the OR-Tools API. Model changes (e.g., adding a new constraint type) take 2-3 days vs. hours for heuristics.",
      outcome:
        "Zero gate conflicts in 8 months of operation (vs. 3.4/day before). The investment in MILP was absolutely justified.",
    },
    {
      decision: "Local sub-problem re-optimization over global re-optimization",
      context:
        "Full global re-optimization takes 2.3 seconds average. Real-time re-optimization requirement is 150ms. These constraints are incompatible.",
      alternatives: [
        "Full global re-optimization (too slow)",
        "Heuristic fast-path",
        "Pre-computed contingency plans",
      ],
      rationale:
        "A flight delay affects a bounded neighborhood in the schedule graph — the gate where it's assigned and flights scheduled in the surrounding 4-hour window. This sub-problem has 50-80 variables instead of 600+, and solves in 40-90ms with the same MILP approach.",
      tradeoffs:
        "Local solutions may be suboptimal globally. In practice, the nightly global solve sets a good baseline, and local perturbations are small enough that local optimality ≈ global optimality for the affected window.",
      outcome:
        "P99 re-optimization latency: 94ms. Zero SLA violations in production.",
    },
    {
      decision: "WebSockets over polling",
      context:
        "The operational control room needed sub-5-second latency for gate conflict alerts. The dashboard shows 600 flights updating in real time.",
      alternatives: [
        "HTTP polling every 5 seconds",
        "Server-Sent Events (SSE)",
        "WebSocket",
      ],
      rationale:
        "At 2-second polling intervals, 300 concurrent dashboard sessions would generate 5.4M requests/day to the optimization API. WebSocket maintains a persistent connection, pushes deltas only when state changes. Typical session: 150KB data received over an 8-hour shift. Polling: ~120MB.",
      tradeoffs:
        "WebSocket connections require sticky session routing at the load balancer. More complex connection lifecycle management.",
      outcome:
        "99.7% reduction in API call volume. Dashboard operators report sub-500ms perceived latency for conflict alerts.",
    },
  ],

  challenges: [
    {
      title: "The constraint model didn't match operational reality",
      description:
        "Our initial model treated gates as binary — occupied or free. Real operations have buffer times: aircraft needs 15 min after pushback before the gate is usable (jet blast, equipment clearance). Crew assignments need 45 min minimum at the gate. We discovered this 3 months in when the solver produced technically valid but practically impossible schedules.",
      resolution:
        "Added time-buffer constraints to the model. Introduced 'soft' buffer constraints (penalties in the objective function) vs. 'hard' constraints (absolute prohibitions) to allow the solver to make principled tradeoffs during peak periods.",
    },
    {
      title: "FAA SWIM data quality and latency variability",
      description:
        "FAA SWIM data has variable latency (50ms to 8 minutes in the same session) and occasional duplicate events, out-of-order delivery, and missing events. Our initial architecture assumed reliable, ordered delivery.",
      resolution:
        "Implemented event deduplication with 15-minute sliding window. Switched to event-time processing in Kafka with watermarks. Added a reconciliation process that compares our schedule state to official FAA data every 5 minutes. Event sourcing made reconciliation possible.",
    },
    {
      title: "Stakeholder conflict: airlines vs. airport authority",
      description:
        "Airlines optimize for their aircraft; the airport optimizes for total throughput. An optimal airport schedule might consistently give one airline suboptimal gate positions. Three airlines formally objected to the system's initial outputs.",
      resolution:
        "Added per-airline fairness constraints (no airline's median taxi time can exceed airport median by >10%). Introduced a 'stakeholder preference' layer that encodes known airline preferences as soft constraints. Monthly stakeholder review meetings now validate the objective function weights.",
    },
  ],

  implementation: {
    overview:
      "The constraint model is the intellectual core of the project. Everything else (ingestion, API, dashboard) is plumbing. We spent 6 of 10 months on the solver, constraint modeling, and validation against historical data.",
    highlights: [
      "OR-Tools CP-SAT model with 4,200 variables and 12,800 constraints for a 600-flight day",
      "Constraint categories: gate compatibility, temporal exclusivity, buffer times, airline fairness, turnaround crew availability",
      "Nightly full solve with 10-second budget; sub-problem solve with 100ms budget",
      "Model versioning: constraint changes are tracked and A/B tested against historical data",
      "Shadow mode deployment: ran parallel to the old system for 60 days before cutover",
    ],
    codeSnippets: [
      {
        filename: "gate_optimizer.py",
        language: "python",
        description:
          "Core OR-Tools CP-SAT constraint model for gate assignment",
        code: `from ortools.sat.python import cp_model
from typing import Iterator

def build_assignment_model(
    flights: list[dict],
    gates: list[dict],
    time_horizon_min: int = 1440,
) -> tuple[cp_model.CpModel, dict]:
    model = cp_model.CpModel()

    # Decision variable: is flight f assigned to gate g?
    assign: dict[tuple[str, str], cp_model.IntVar] = {}
    for flight in flights:
        for gate in gates:
            compatible = gate["aircraft_types"] & flight["aircraft_types"]
            if compatible:
                var_name = f"x_{flight['id']}_{gate['id']}"
                assign[(flight["id"], gate["id"])] = model.new_bool_var(var_name)

    # Hard constraint: each flight gets exactly one gate
    for flight in flights:
        eligible = [
            assign[(flight["id"], g["id"])]
            for g in gates
            if (flight["id"], g["id"]) in assign
        ]
        if eligible:
            model.add_exactly_one(eligible)

    # Hard constraint: no temporal overlap at same gate (with buffer)
    def overlaps(f1: dict, f2: dict, buffer_min: int = 15) -> bool:
        return (
            f1["arr_min"] < f2["dep_min"] + buffer_min
            and f2["arr_min"] < f1["dep_min"] + buffer_min
        )

    for gate in gates:
        gate_flights = [f for f in flights if (f["id"], gate["id"]) in assign]
        for i, f1 in enumerate(gate_flights):
            for f2 in gate_flights[i + 1 :]:
                if overlaps(f1, f2):
                    model.add_bool_or([
                        assign[(f1["id"], gate["id"])].negated(),
                        assign[(f2["id"], gate["id"])].negated(),
                    ])

    # Soft objective: maximize gate utilization
    utilization = [v for v in assign.values()]
    model.maximize(sum(utilization))

    return model, assign`,
      },
    ],
  },

  metrics: [
    {
      label: "Gate conflicts",
      value: "0.2 /day",
      description: "Down from 3.4/day (94% reduction)",
      highlighted: true,
    },
    {
      label: "Average delay reduction",
      value: "23%",
      description: "Across all flights over 8-month window",
      highlighted: true,
    },
    {
      label: "Gate utilization",
      value: "89%",
      description: "Up from 74%",
      highlighted: true,
    },
    {
      label: "Full-day optimization",
      value: "2.3s",
      description: "Average solve time for 600-flight day",
    },
    {
      label: "Real-time re-opt P99",
      value: "94ms",
      description: "Sub-problem constraint solve",
    },
    {
      label: "SWIM events processed",
      value: "15k/hr",
      description: "Peak throughput, zero message loss",
    },
    {
      label: "Annual savings",
      value: "~$2.1M",
      description: "Reduced towing costs + delay penalties",
    },
  ],

  performance: {
    summary:
      "The optimization solver is the performance-critical component. We spent 4 weeks tuning CP-SAT parameters, constraint ordering, and model formulation to hit the 2.3s average target.",
    details: [
      "CP-SAT parallelism set to 8 workers — scales with available cores on the optimization host",
      "Constraint propagation order tuned: temporal exclusivity before compatibility (more pruning)",
      "Warm starting: nightly solve re-uses previous day's solution as starting hint",
      "Database: composite index on (gate_id, arr_time, dep_time) eliminates full scans in sub-problem extraction",
    ],
  },

  lessons: [
    {
      type: "insight",
      title: "Shadow mode is non-negotiable for safety-critical systems",
      description:
        "Running parallel to the old system for 60 days before cutover let us discover 14 edge cases and 3 model errors that would have caused incidents in production. The cost of 60 days of dual operation was trivial compared to the cost of a production failure.",
    },
    {
      type: "mistake",
      title: "We modeled the system, not the operations",
      description:
        "Our initial constraint model was mathematically correct but operationally naive. We didn't understand buffer times, airline preferences, or the informal rules that had evolved over 30 years. Three weeks of embedded operations observation would have saved us a month of rework.",
    },
    {
      type: "win",
      title: "Event sourcing on the SWIM consumer paid dividends",
      description:
        "Twice we discovered data processing bugs in the SWIM consumer. Because we stored every raw event before processing, we replayed the affected windows and corrected all derived schedule states without any manual intervention.",
    },
    {
      type: "insight",
      title: "Explainability is a first-class requirement",
      description:
        "Operations staff refused to trust the optimizer until they could understand why it made each assignment. We added a constraint-explanation layer that renders assignments like 'AA123 → Gate B7 because: first eligible large-body gate in the 14:00-17:00 window with sufficient buffer after AA456 departure.' Trust increased immediately.",
    },
  ],

  improvements: [
    "Multi-airport coordination: cascading delays between connected airports",
    "Crew scheduling integration: ground crews today are scheduled separately, causing misalignment",
    "Passenger impact scoring: weight delay penalties by passenger connection criticality",
    "Weather integration: FAA MOS weather forecasts to pre-position assets",
    "ML-based delay prediction to pre-solve likely scenarios before they materialize",
  ],

  links: [
    { type: "github", label: "Optimizer core (private)", url: "#" },
    { type: "docs", label: "Constraint model documentation", url: "#" },
  ],
  relatedProjects: ["ai-crime-platform", "engineering-portfolio"],
};
