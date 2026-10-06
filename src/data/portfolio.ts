export const profile = {
  name: "Sunny Kr Singh",
  role: "Java / Spring Boot Backend Developer",
  location: "Bengaluru, Karnataka, India",
  email: "sunnyks058@gmail.com",
  links: {
    github: "https://github.com/thesunnycode",
    linkedin: "https://www.linkedin.com/in/thesunnycode/",
    leetcode: "https://leetcode.com/u/thesunnycode",
    resume: "/Sunny_Kr_Singh_Resume.pdf",
  },
};

// Short overview — the résumé carries the full task list; the site carries accountability.
export const experience = {
  company: "Redalis",
  title: "Web Development Intern",
  location: "Bangalore, Karnataka",
  period: "Jun — Sep 2026",
  overview:
    "I owned the backend of a content and website-management platform: the authentication system, the data model behind its multi-level organizational hierarchy, and the caching and rate limiting that kept repeated reads and abusive requests off the database.",
  scope: ["6+ backend modules", "JWT auth with refresh tokens and RBAC", "Hierarchical PostgreSQL data model", "Redis caching + rate limiting"],
};

export type Challenge = { t: string; d: string };
export type Project = {
  slug: "hyperlocal" | "ecommerce-api" | "resolveai";
  name: string;
  subtitle: string;
  tag: string;
  status: "Completed" | "In Development";
  summary: string;
  capabilities: string[];
  problem: string;
  howItWorks: string[];
  security: string[];
  stack: string[];
  flow: { label: string; note: string }[];
  highlight: number;
  challenges: Challenge[];
  decisions: string[];
  progress?: { done: string[]; next: string[] };
  visuals: { label: string; caption: string }[];
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "resolveai",
    name: "ResolveAI",
    subtitle: "AI-Assisted Helpdesk & Incident Triage Platform",
    tag: "AI-Assisted Backend",
    status: "In Development",
    summary:
      "A helpdesk backend where the model produces triage signals and deterministic policy turns them into priority and routing. The AI suggests; the system decides — so every decision stays explainable and testable. In active development; nothing here is presented as deployed.",
    capabilities: [
      "Ticket state machine with an append-only audit trail",
      "Deterministic policy on top of LLM signals",
      "Hybrid retrieval — pgvector + full-text, fused with RRF",
    ],
    problem:
      "Support teams triage tickets by hand: priority depends on who reads it first, SLAs get tracked inconsistently, and dozens of tickets from the same incident get handled one by one. ResolveAI turns unstructured tickets into structured work — without handing the decisions to a model.",
    howItWorks: [
      "A ticket enters through the REST API and commits alongside its outbox event in one transaction — creation never waits on an LLM call.",
      "A worker claims events with SKIP LOCKED, strips PII, and asks the model for structured triage signals.",
      "Deterministic policy converts those signals into priority and routing, writing every transition into the state machine's audit trail.",
      "Related tickets are correlated into incident proposals, confirmed by a human, then updated once and fanned out.",
    ],
    security: [
      "JWT access + refresh tokens with four roles — CUSTOMER, AGENT, TEAM_LEAD, ADMIN.",
      "Tenant isolation enforced across the backend, not just filtered in the UI.",
      "PII is redacted before any model call; every generated claim must carry a citation.",
    ],
    stack: ["Java 21", "Spring Boot 3.x", "PostgreSQL 16", "pgvector", "Redis", "MinIO / S3", "Prometheus", "Grafana", "React", "Tailwind"],
    flow: [
      { label: "POST /tickets", note: "Ticket creation never waits on an LLM call." },
      { label: "Outbox", note: "Ticket row and event commit in one transaction." },
      { label: "Worker", note: "Claims events with SKIP LOCKED; restart-safe." },
      { label: "PII Redaction", note: "Sensitive data is stripped before any model sees it." },
      { label: "LLM", note: "Returns structured triage signals, not decisions." },
      { label: "Policy", note: "Deterministic rules compute priority and routing." },
    ],
    highlight: 5,
    visuals: [
      { label: "Ticket workflow", caption: "Project screenshot pending" },
      { label: "Triage & routing", caption: "Project screenshot pending" },
    ],
    challenges: [
      { t: "AI in the request path", d: "An LLM call inside ticket creation would make it slow and unpredictable — so signals are produced asynchronously behind an outbox worker, and the request path stays deterministic." },
      { t: "Trustworthy drafts", d: "Generated text can invent facts. Every draft claim must be backed by a citation, and drafts with low citation coverage are suppressed rather than sent." },
      { t: "Restart safety", d: "Workers crash mid-job. SKIP LOCKED plus the outbox means an event is processed exactly once, and nothing is lost on restart." },
    ],
    decisions: [
      "PostgreSQL for SKIP LOCKED, partial unique indexes, JSONB, full-text search and pgvector in one engine.",
      "An outbox so ticket persistence and event creation are atomic — even if the worker dies mid-flight.",
      "Deterministic policy after the model keeps business decisions explainable, testable and reviewable.",
    ],
    progress: {
      done: [
        "Modular monolith core: IAM, Ticketing, SLA and Platform modules",
        "Ticket state machine with an append-only audit trail",
        "JWT auth with refresh tokens, four roles, tenant isolation",
        "PostgreSQL schema with versioned migrations",
        "Outbox worker claiming events with SKIP LOCKED",
        "PII redaction pipeline before any model call",
      ],
      next: [
        "Hybrid retrieval: pgvector + full-text, merged with Reciprocal Rank Fusion",
        "Citation-enforced draft generation and its evaluation harness",
        "Incident correlation and the human-confirmed proposal gate",
        "Prometheus + Grafana observability dashboards",
      ],
    },
    repo: "https://github.com/thesunnycode/ResolveAI",
  },
  {
    slug: "hyperlocal",
    name: "Hyperlocal",
    subtitle: "Multi-Tenant Delivery Management Backend",
    tag: "Delivery Systems",
    status: "Completed",
    summary:
      "A multi-tenant delivery backend: customers create shipments, the API assigns the least-loaded available agent, and every status change moves through a state machine into an audit trail. A React frontend covers live tracking and agent dashboards.",
    capabilities: [
      "43 REST APIs across auth, shipments and agents",
      "Automated assignment by agent load",
      "Delivery state machine with a full audit trail",
    ],
    problem:
      "Small delivery operations had no structured way to manage shipments and agents — assignment was manual and status changes went untracked. Hyperlocal gives them a multi-tenant backend where shipment, agent and auth concerns live behind one API.",
    howItWorks: [
      "A customer creates a shipment through the REST API; validation and persistence happen in the shipment service.",
      "Assignment checks agent load at dispatch time and ships to the least-loaded available agent.",
      "Every status change passes the state machine and is appended to the audit trail.",
      "The React frontend shows live shipment tracking and agent dashboards.",
    ],
    security: [
      "JWT authentication with access and refresh tokens.",
      "Role-based access control across customer and agent routes.",
      "Multi-tenant boundaries enforced in the data layer, not just the UI.",
    ],
    stack: ["Java 17", "Spring Boot", "Spring Security", "MySQL", "Flyway", "React", "Heroku"],
    flow: [
      { label: "Customer", note: "Creates a shipment through the REST API." },
      { label: "Auth", note: "JWT access + refresh tokens with RBAC." },
      { label: "Shipment Svc", note: "Validates and persists the shipment." },
      { label: "Assignment", note: "Picks the least-loaded available agent." },
      { label: "State Machine", note: "Only legal delivery transitions are allowed." },
      { label: "Audit Trail", note: "Every status change is recorded." },
    ],
    highlight: 4,
    visuals: [
      { label: "Shipment tracking", caption: "Project screenshot pending" },
      { label: "Agent dashboard", caption: "Project screenshot pending" },
    ],
    challenges: [
      { t: "Keeping status honest", d: "Free-form status fields let deliveries jump backwards or skip states. The state machine makes invalid transitions impossible instead of merely discouraged." },
      { t: "Fair assignment", d: "Round-robin overloads busy agents. Assignment reads agent load at dispatch time so work lands on whoever can actually take it." },
      { t: "Multi-tenancy at the data layer", d: "Filtering tenant data in application code is fragile — one missed condition leaks another tenant's shipments. Tenant isolation lives in the data layer so it applies uniformly across every query." },
    ],
    decisions: [
      "A state machine instead of free-form status fields — invalid transitions become impossible, not merely discouraged.",
      "Flyway migrations so every schema change is versioned and reviewable.",
      "An audit trail on every status change so any dispatch can be traced after the fact.",
    ],
    repo: "https://github.com/thesunnycode/hyperlocal-delivery",
  },
  {
    slug: "ecommerce-api",
    name: "E-Commerce REST API",
    subtitle: "Catalog, Checkout & Payments Backend",
    tag: "Payments",
    status: "Completed",
    summary:
      "A production-style commerce backend: catalog, cart and orders with Stripe Checkout. Order state only changes after a webhook's signature is verified.",
    capabilities: [
      "Catalog, cart and order management over JPA / Hibernate",
      "Stripe Checkout with signature-verified webhooks",
      "JWT auth with BCrypt hashing and role-based access",
    ],
    problem:
      "A commerce backend is a domain everyone builds — and most builds trust the wire: hand-written converters that drift, API contracts nobody can read, and order state that changes on whatever webhook arrives. This project is the same domain built with the trust checks in place.",
    howItWorks: [
      "Clients browse the catalog and manage a cart; checkout hands payment over to Stripe.",
      "Cart becomes an order through JPA / Hibernate, with the schema managed by Flyway migrations.",
      "Stripe webhooks are signature-verified before any order state changes.",
    ],
    security: [
      "JWT authentication with BCrypt-hashed passwords.",
      "Role-based access control separating admin and customer routes.",
      "Webhook signature verification as the gate on payment state.",
    ],
    stack: ["Java 17", "Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "MySQL", "Flyway", "Stripe API", "MapStruct", "OpenAPI"],
    flow: [
      { label: "Client", note: "Browses the catalog and manages the cart." },
      { label: "JWT + RBAC", note: "BCrypt-hashed credentials, role-based access." },
      { label: "Orders", note: "Cart → order via JPA / Hibernate." },
      { label: "Stripe Checkout", note: "Payment handled by Stripe." },
      { label: "Verify Signature", note: "Webhook signature checked before state changes." },
      { label: "MySQL", note: "Schema managed by Flyway migrations." },
    ],
    highlight: 4,
    visuals: [
      { label: "Catalog & checkout", caption: "Project screenshot pending" },
      { label: "Order workflow", caption: "Project screenshot pending" },
    ],
    challenges: [
      { t: "Trust nothing from the wire", d: "A forged webhook could mark an order paid for free. Signature verification runs before any mutation, and unverified events are rejected outright." },
      { t: "Mapping at scale", d: "Hand-written converters drift as fields change. MapStruct generates DTO/entity mapping, so a renamed field fails at compile time — not in production." },
      { t: "Schema as a contract", d: "Ad-hoc DDL changes break the team's understanding of the data model. Flyway versioned migrations and OpenAPI-generated docs mean every schema and API change is explicit, reviewable, and reproducible." },
    ],
    decisions: [
      "Webhook signature verification before any order mutation — a forged event never touches state.",
      "MapStruct for DTO/entity mapping instead of hand-written converters.",
      "Flyway for versioned schema and OpenAPI so API contracts are explicit, not guessed.",
    ],
    repo: "https://github.com/thesunnycode/ecommerce-rest-api",
  },
];

export const decisions = [
  { q: "Why PostgreSQL?", a: "SKIP LOCKED, partial unique indexes, JSONB, full-text search and pgvector in one engine." },
  { q: "Why Redis?", a: "Idempotency keys, rate limiting, caching and short-lived locks." },
  { q: "Why an outbox?", a: "Ticket persistence and event creation must be atomic." },
  { q: "Why a modular monolith?", a: "There's no independent scaling or deployment requirement yet." },
  { q: "Why pgvector?", a: "Vectors stay transactionally close to application data." },
  { q: "Why deterministic policy after AI?", a: "AI provides signals; business decisions stay explainable and testable." },
  { q: "Why state machines?", a: "Invalid transitions become impossible instead of merely discouraged." },
  { q: "Why refresh tokens?", a: "Short-lived access tokens limit exposure without forcing frequent logins." },
];

export const stack: { group: string; items: { name: string; note: string }[] }[] = [
  { group: "Java", items: [
    { name: "Spring Boot", note: "Primary framework across every project." },
    { name: "Spring Security", note: "JWT authentication, RBAC and method-level authorization." },
    { name: "JPA / Hibernate", note: "Entity modelling on MySQL and PostgreSQL." },
    { name: "REST APIs", note: "43 endpoints in Hyperlocal; 6+ modules at Redalis." },
  ]},
  { group: "Data", items: [
    { name: "PostgreSQL", note: "Hierarchical models, SKIP LOCKED, full-text search." },
    { name: "MySQL", note: "Hyperlocal and E-Commerce persistence." },
    { name: "Redis", note: "Caching, rate limiting, idempotency." },
    { name: "pgvector", note: "Hybrid retrieval in ResolveAI." },
  ]},
  { group: "Engineering", items: [
    { name: "JWT / RBAC", note: "Access + refresh tokens with role checks." },
    { name: "State Machines", note: "Delivery and ticket lifecycles." },
    { name: "Webhooks", note: "Stripe signature verification." },
    { name: "Async Processing", note: "Outbox + worker pipelines." },
  ]},
  { group: "Tools", items: [
    { name: "Maven", note: "Build tooling." },
    { name: "Flyway", note: "Versioned schema migrations." },
    { name: "Docker", note: "Local infrastructure." },
    { name: "Testcontainers", note: "Integration tests against real databases." },
    { name: "OpenAPI / Swagger", note: "API documentation." },
    { name: "Git / GitHub", note: "Version control." },
  ]},
  { group: "AI Systems", items: [
    { name: "Spring AI", note: "LLM integration from Java." },
    { name: "RAG", note: "Retrieval-backed, citation-enforced drafts." },
    { name: "Vector Search", note: "pgvector + full-text with RRF." },
    { name: "AI Evaluation", note: "Measuring draft quality and coverage." },
  ]},
];

export const principles = [
  { t: "Build for correctness", d: "State machines, validation, transactions and constraints should prevent invalid states." },
  { t: "Keep critical decisions deterministic", d: "AI can help with unstructured input; important business decisions stay explainable and testable." },
  { t: "Security by design", d: "Authentication, authorization, tenant isolation and input validation are part of the architecture." },
  { t: "Measure what matters", d: "Latency, queue depth, SLA performance, cache hit rates and AI costs should be observable." },
];

export const education = [
  { degree: "MCA", school: "Jain (Deemed-to-be University), Bengaluru", period: "2025 — 2027", score: "SGPA 8.739" },
  { degree: "BCA", school: "St. Xavier's College of Management & Technology, Patna", period: "2022 — 2025", score: "CGPA 8.29" },
];
