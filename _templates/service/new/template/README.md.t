---
to: apps/backend/<%=name%>-service/README.md
---
# Microservice: <%= h.changeCase.title(name) %>

> **Mentor (Curator) Note:** Before writing code, fill out this document. It serves as our "Level-Zero ADR" and ensures the service adheres to our architectural pillars.

## 1. 🎯 Domain (DDD)

### Bounded Context

- **Name:** `<%= h.changeCase.title(name) %> Context`
- **Responsibility (Ubiquitous Language):**
  - _Describe in 1-2 sentences what this service does and what it protects. Use our domain terms (e.g., "Manages the creation and lifecycle of 'Trilhas' (Roadmaps)")._

### Aggregate Root

- **Main Aggregate:** `[AggregateName]` (e.g., `Roadmap`, `User`)
- **Entities/VOs:** `[Entity1]`, `[ValueObject2]`

## 2. 🚦 APIs & Events (Communication)

### APIs (Synchronous Input)

- **Responsibility:** _How do other services or the front-end "drive" this service?_
- **OpenAPI (Swagger) Docs:** `[Link to /api-docs]`
- **Main Consumers:** `[Frontend]`, `[Identity Service]`, etc.

### Published Events (Asynchronous Output)

- **Responsibility:** _What does this service inform the rest of the world? (Pillar: Event-Driven)_
- **Kafka/RabbitMQ Topic(s):**
  - `<%= h.changeCase.lower(name) %>.[event_created]` (e.g., `roadmap.created`)
  - `<%= h.changeCase.lower(name) %>.[event_updated]`

### Consumed Events (Asynchronous Input)

- **Responsibility:** _What events from other domains does this service depend on?_
- **Kafka/RabbitMQ Topic(s):**
  - `identity.user_created` (Listener: `HandleUserCreation`)
  - `...`

## 3. 💾 Persistence (Pillar: Data Mesh)

- **Technology:** `[PostgreSQL (via Prisma)]` or `[MongoDB (via Prisma)]`
  - _Justify the choice (e.g., "SQL for relational Identity data", "NoSQL for Roadmap flexibility")._
- **Data Product:** This service's `schema.prisma` is the source of truth for the `<%= h.changeCase.title(name) %>` Domain.

## 4. 📊 Observability & SRE (Pillars)

### SLOs (Service Level Objectives)

- _Define this service's "Error Budget."_
- **Availability (Read):** `99.9%`
- **Latency (Write p95):** `< 300ms`

### Key Metrics (OpenTelemetry)

- _What are the 3 main dashboards we need to see? (Pillar: Business Dashboards)_
- `[<%= h.changeCase.lower(name) %>_created_per_minute]`
- `[error_rate_endpoint_X]`
- `[use_case_latency_Y]`

- **Dashboard Link:** `[Link to Datadog/Grafana]`

---

## 5. 🛠️ Developer Guide (Pillar: DX)

### Running Locally

```bash
# 1. Start the database (and Kafka)
docker-compose up -d <%= h.changeCase.lower(name) %>-db

# 2. Run the service (from the monorepo root)
pnpm run dev --filter=<%= h.changeCase.lower(name) %>
```
