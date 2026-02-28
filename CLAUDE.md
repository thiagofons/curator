# Curator Project — LLM Design Guide

> **Purpose:** This document orients LLMs to generate correct, consistent code for the Curator monorepo. Read this before writing any code.

---

## 1. Context

Curator is a dark-academia ed-tech/media platform that fights "Brainrot" by offering structured cultural roadmaps. The founder (Thiago) applies CS system-thinking to humanities.

**Brand keywords:** Dark Academia, Noir, Minimalist, Sophisticated, Provocative, Anti-Brainrot.
**Target audience:** Gen Z / Young Millennials, 18–30 years old.

---

## 2. Monorepo Structure

**Package manager:** `pnpm` v9.5.0 | **Build orchestrator:** Turborepo v2.3.3 | **Node:** v22

```
curator/
├── apps/
│   ├── frontend/
│   │   ├── website/        # Astro 5 SSR — public blog + landing (Vercel)
│   │   ├── docs/           # Next.js 16 + Nextra — developer docs
│   │   └── storybook/      # Storybook 9 — component explorer
│   └── backend/
│       ├── api/            # NestJS 11 + tRPC — API service (port 3300)
│       └── cms/    # Next.js 16 + Payload CMS 3 — headless CMS (port 3000)
├── packages/
│   ├── ui-web/             # @repo/ui-web — shared React component library
│   ├── ui-mobile/          # @repo/ui-mobile — React Native components
│   ├── trpc/               # @repo/trpc — typed tRPC client
│   ├── rabbitmq/           # @repo/rabbitmq — NestJS RabbitMQ wrapper
│   ├── lib/                # @repo/lib — general utilities
│   ├── eslint-config/      # Shared ESLint config
│   ├── typescript-config/  # Shared tsconfig templates
│   └── vitest-config/      # Shared Vitest config
├── infrastructure/         # Terraform — AWS Lightsail provisioning
│   ├── modules/lightsail/  # Reusable Lightsail module (instance, IP, firewall)
│   ├── scripts/            # Cloud-init user-data for instance bootstrap
│   ├── main.tf             # Root module composition
│   ├── providers.tf        # AWS provider + default tags
│   ├── variables.tf        # Input variables
│   └── outputs.tf          # Static IP output for DNS
├── scripts/                # Operational scripts (SSL bootstrap)
├── nginx/                  # Reverse proxy configs
│   ├── nginx.staging.conf  # Local staging (*.curator.local, HTTP)
│   └── nginx.prod.conf     # Production (*.curator.com.br, HTTPS + Certbot)
├── observability/          # Grafana, Prometheus, Loki, Tempo, OTEL configs
├── .github/workflows/
│   ├── ci-pull-request.yaml  # CI — lint, test, SonarQube (on PR + push)
│   └── cd-deploy.yaml        # CD — build images, deploy to Lightsail (after CI passes on main)
├── docker-compose.development.yaml   # Dev (hot reload, direct ports, local DBs)
├── docker-compose.staging.yaml       # Staging (production-like, *.curator.local)
└── docker-compose.production.yaml    # Production (Docker Swarm, SSL, *.curator.com.br)
```

**Workspace package aliases:** `@repo/ui-web`, `@repo/trpc`, `@repo/rabbitmq`, `@repo/lib`, `@backend/api`, `@backend/cms`, etc.

---

## 3. Environments & Infrastructure

### Three Environments

| Environment     | Compose File                      | Access                                     | SSL                 | Database                  | Orchestration  |
| --------------- | --------------------------------- | ------------------------------------------ | ------------------- | ------------------------- | -------------- |
| **Development** | `docker-compose.development.yaml` | `localhost:3300`, `localhost:3000`         | No                  | Local Postgres containers | Docker Compose |
| **Staging**     | `docker-compose.staging.yaml`     | `api.curator.local`, `cms.curator.local`   | No                  | Local Postgres containers | Docker Compose |
| **Production**  | `docker-compose.production.yaml`  | `api.curator.com.br`, `cms.curator.com.br` | Yes (Let's Encrypt) | Supabase (managed)        | Docker Swarm   |

- **Development:** Hot-reload with source mounts, direct port access. No nginx.
- **Staging:** Builds production Docker images locally, nginx reverse proxy with `*.curator.local` subdomains. Requires `/etc/hosts` entries.
- **Production:** Pre-built images from GHCR, nginx with SSL (Certbot auto-renewal), Docker Swarm on AWS Lightsail.

### Production Stack (Docker Swarm on AWS Lightsail)

```
Internet → Lightsail Static IP
              ↓
     nginx (ports 80/443, SSL termination)
       ├─ api.curator.com.br → api:3300
       ├─ cms.curator.com.br → cms:3000
       └─ /health → 200 ok
     certbot (auto-renews certs every 12h)
     redis (password-protected, persistent)
```

**Databases:** Hosted on Supabase (not in Docker). Connection strings in `.env.production`.
**Container images:** `ghcr.io/thiagofons/curator-api` and `ghcr.io/thiagofons/curator-cms`.
**Frontend website:** Deployed on Vercel (separate from Lightsail).

### Terraform (Infrastructure as Code)

Provisions the Lightsail instance, static IP, and firewall rules. Modular structure:

```
infrastructure/
├── main.tf                          # Calls modules/lightsail
├── providers.tf                     # AWS provider + default tags
├── variables.tf                     # region, bundle_id, key_pair_name, etc.
├── outputs.tf                       # static_ip (for DNS)
├── terraform.tfvars.example         # Documented variable values
├── modules/lightsail/
│   ├── main.tf                      # Instance + static IP + attachment
│   ├── firewall.tf                  # Dynamic port rules from open_ports list
│   ├── variables.tf                 # Module inputs
│   └── outputs.tf                   # Module outputs
└── scripts/user-data.sh             # Cloud-init: Docker, Swarm, Certbot, Git
```

State is stored **locally** (not remote). Terraform files (`.terraform/`, `*.tfstate`, `*.tfvars`) are gitignored.

### Nginx Configuration

Both configs use `resolver 127.0.0.11` (Docker's internal DNS) with variable-based `proxy_pass` so nginx starts even if backend services are temporarily unavailable.

- **`nginx/nginx.staging.conf`** — HTTP only, `*.curator.local` subdomains
- **`nginx/nginx.prod.conf`** — HTTPS with Let's Encrypt certs, HTTP→HTTPS redirect, ACME challenge for Certbot

---

## 4. CI/CD Pipeline

### Branch Protection (GitHub Ruleset)

- **PRs required** to merge into `main` (no direct pushes)
- **Required status checks:** Lint & Format, Unit Tests, Integration Tests
- **Strict mode:** PR must be up to date with main before merging

### CI — Pull Request Validation (`ci-pull-request.yaml`)

Triggers on: push to `main`/`develop`, all pull requests.

```
Static Checks (Lint + Format)
    ├── Unit Tests (with coverage) ──→ SonarQube Analysis (matrix: 9 services)
    └── Integration Tests (with Postgres service container)
```

### CD — Deploy (`cd-deploy.yaml`)

Triggers on: CI passes on `main` (via `workflow_run`).

```
CI Gate (only if CI succeeded)
    ├── Terraform Provision (only if infrastructure/ files changed)
    └── Build & Push to GHCR (matrix: api, cms)
            └── Deploy to Lightsail via SSH (environment: production)
                - docker pull images
                - git pull config
                - docker stack deploy
                - force-update nginx
```

**Concurrency:** Only one production deploy at a time (queued, not cancelled).
**Environment protection:** The `production` environment can require manual approval.

### Required GitHub Secrets

| Secret                    | Purpose                                |
| ------------------------- | -------------------------------------- |
| `LIGHTSAIL_HOST`          | Static IP of the Lightsail instance    |
| `LIGHTSAIL_USER`          | SSH username (typically `ubuntu`)      |
| `LIGHTSAIL_SSH_KEY`       | Private key for SSH access             |
| `GHCR_PAT`                | GitHub PAT with `packages:write` scope |
| `AWS_ACCESS_KEY_ID`       | For Terraform provisioning             |
| `AWS_SECRET_ACCESS_KEY`   | For Terraform provisioning             |
| `LIGHTSAIL_KEY_PAIR_NAME` | Lightsail SSH key pair name            |
| `SONAR_TOKEN_GLOBAL`      | SonarQube authentication               |
| `SONAR_HOST_URL`          | SonarQube server URL                   |

---

## 5. Frontend: Astro Website (`apps/frontend/website`)

### Framework Pattern

- **Static structure** → `.astro` files (zero JS by default)
- **Interactive islands** → `.tsx` React components with `client:load` or `client:idle`
- **SSR** via Vercel adapter; i18n routing for `en` and `pt-br`
- **File-based routing** under `src/pages/`

### Page Layout

Every page wraps in `Base.astro` (title, meta, theme, GTM, fonts, Navbar, Footer).

```astro
---
import Base from "@/layouts/Base.astro";
---

<Base title="Page Title" description="...">
  <slot />
</Base>
```

### Component Conventions

- **Folder:** `src/components/<feature>/ComponentName.astro` or `.tsx`
- **Naming:** PascalCase
- **Feature folders:** `common/`, `home/`, `blog/`, `get-started/`, `providers/`
- Import shared UI from `@repo/ui-web/base/*` or `@repo/ui-web/custom/*`

### Feature Flags (Flagsmith)

Pages guard features with Flagsmith checks; redirect to `/404` if flag disabled.

---

## 6. Design System: `@repo/ui-web`

### Critical Rule

**Always import from `@repo/ui-web`** instead of installing Radix or ShadcnUI directly.

```tsx
import { Button } from "@repo/ui-web/base/button";
import {
  Display,
  H2,
  H3,
  BodyBase,
  SubheadingXL,
} from "@repo/ui-web/custom/typography";
import { Card, CardHeader, CardContent } from "@repo/ui-web/base/card";
```

### Typography System

Use semantic wrapper components. Never write raw `text-xl font-bold` classes for headings.

| Component        | Variant         | Default Tag | Use Case                   |
| ---------------- | --------------- | ----------- | -------------------------- |
| `<Display>`      | `display-h1`    | `h1`        | Hero sections              |
| `<H2>`           | `heading-h2`    | `h2`        | Major sections             |
| `<H3>`           | `heading-h3`    | `h3`        | Subsections                |
| `<H4>`           | `heading-h4`    | `h4`        | Minor subsections          |
| `<SubheadingXL>` | `subheading-xl` | `p`         | Prominent descriptive text |
| `<SubheadingLG>` | `subheading-lg` | `p`         | Descriptive text           |
| `<SubheadingMD>` | `subheading-md` | `p`         | Standard descriptive text  |
| `<SubheadingSM>` | `subheading-sm` | `span`      | Labels/tags (uppercase)    |
| `<SubheadingXS>` | `subheading-xs` | `span`      | Micro labels (uppercase)   |
| `<BodyLarge>`    | `body-large`    | `p`         | Emphasized paragraphs      |
| `<BodyBase>`     | `body-base`     | `p`         | Standard paragraphs        |
| `<BodySmall>`    | `body-small`    | `p`         | Secondary info             |
| `<ButtonText>`   | `btn-text`      | `span`      | Inside buttons             |

All accept `as`, `color`, and any HTML attribute. Override semantic tag with `as` prop.

```tsx
<Display color="foreground">Stop consuming noise.</Display>
<SubheadingXL color="muted-foreground">Start building wisdom.</SubheadingXL>
<H2 as="div">Section without h2 in outline</H2>
```

### Color System

**Font:** Lexend (variable weight 100–900, loaded via Google Fonts).

**Primitive tokens** (fixed brand colors):

| Token             | HSL            | Hex       | Usage                |
| ----------------- | -------------- | --------- | -------------------- |
| `brand-blue`      | `217 100% 48%` | `#0060f7` | Primary actions      |
| `brand-blue-dark` | `216 100% 8%`  | `#001028` | Dark backgrounds     |
| `gray-lighter`    | `0 0% 93%`     | `#eeeeee` | Muted backgrounds    |
| `gray-light`      | `0 0% 84%`     | `#d5d5d5` | Borders              |
| `gray-normal`     | `215 14% 34%`  | `#4b5563` | Secondary text       |
| `gray-bg`         | `0 0% 10%`     | `#1a1a1a` | Dark mode background |
| `status-green`    | `135 59% 49%`  | `#34c759` | Success states       |
| `status-red`      | `359 100% 61%` | `#ff383c` | Error/destructive    |

**Semantic tokens** (theme-aware, prefer these in components):

| Token                | Light Mode        | Dark Mode     |
| -------------------- | ----------------- | ------------- |
| `background`         | white             | `gray-bg`     |
| `foreground`         | `brand-blue-dark` | white         |
| `primary`            | `brand-blue`      | `brand-blue`  |
| `primary-foreground` | white             | white         |
| `secondary`          | `gray-normal`     | `gray-normal` |
| `muted`              | `gray-lighter`    | dark blue     |
| `muted-foreground`   | `gray-normal`     | 60% gray      |
| `border`             | `gray-light`      | `gray-normal` |
| `destructive`        | `status-red`      | `status-red`  |

**In Tailwind:** use `bg-primary`, `text-foreground`, `border-border`, `text-muted-foreground`, etc.
**In Typography components:** use `color="primary"`, `color="muted-foreground"`, `color="brand-blue"`.

**Dark mode:** Applied via `class="dark"` on `<html>`. Per-page theme via `<Base theme="dark" />`.

### Button Component

```tsx
import { Button } from "@repo/ui-web/base/button";

// Variants: default | destructive | outline | secondary | ghost | link
// Sizes: default | sm | lg | full | icon
<Button variant="default" size="default">Primary Action</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
<Button asChild><a href="/path">Link styled as button</a></Button>
```

Buttons include Framer Motion `whileTap` scale animation (disable with `disableAnimation`).

### Form Pattern

```tsx
import { Field, FieldLabel, FieldError } from "@repo/ui-web/base/field";
import { Input } from "@repo/ui-web/base/input";
// Use React Hook Form + Zod resolver
<Field orientation="vertical">
  <FieldLabel>Email *</FieldLabel>
  <Input {...field} />
  <FieldError errors={fieldState.errors} />
</Field>;
```

---

## 7. Backend: NestJS Services

### Architecture: Hexagonal / DDD

All backend services follow **Hexagonal Architecture**:

```
src/
├── domain/
│   ├── aggregates/     # Business entities with invariants
│   ├── events/         # Domain events
│   ├── ports/          # Interfaces (repository, event publisher)
│   └── services/       # Domain services
├── application/        # Use cases, DTOs, controllers
├── infrastructure/
│   ├── persistence/prisma/  # Prisma schema + repositories
│   └── messaging/           # RabbitMQ adapters
└── main.ts
```

**Never bypass the domain layer.** Business rules live in aggregates. Infrastructure adapts to ports.

### tRPC (API Gateway)

Type-safe RPC from backend to frontend. Add new procedures in `src/application/`:

```typescript
// Router definition (api)
export const appRouter = router({
  featureName: featureRouter,
});
export type AppRouter = typeof appRouter;
```

Frontend consumes via `@repo/trpc`:

```typescript
import { trpc } from "@repo/trpc";
const result = await trpc.featureName.procedureName.query(input);
```

### RabbitMQ Messaging (`@repo/rabbitmq`)

Services communicate asynchronously via RabbitMQ. Use `@repo/rabbitmq` module:

```typescript
// Publisher (API)
this.rmqService.publish(RMQ_MESSAGES.USERS.GET_ALL, payload);

// Consumer (microservice)
@MessagePattern(RMQ_MESSAGES.USERS.HEALTH_CHECK)
async handleHealthCheck(data: unknown) { ... }
```

Define new message patterns in `packages/rabbitmq/src/messages/`.

### Prisma (Authentication / Identity Services)

```bash
pnpm db:generate        # Generate Prisma client
pnpm db:migrate:dev     # Run migrations locally
pnpm db:studio          # Open Prisma Studio
```

Schema location: `apps/backend/<service>/src/infrastructure/persistence/prisma/schema.prisma`

### CMS Service (Payload CMS)

Blog content is managed via Payload CMS. Collections: `Posts`, `Authors`, `Categories`, `Media`, `Users`.

- **Languages:** Portuguese (`pt`, default) + English (`en`)
- **Access:** Public read, authenticated write for all content collections
- **Editor:** Lexical rich text
- **Server URL:** Configured via `PAYLOAD_SERVER_URL` env var (must match public domain in production)

Frontend fetches content via Payload's REST API or GraphQL.

---

## 8. Code Conventions

### TypeScript

- **Strict mode** everywhere
- **No `any`** — use proper types or `unknown`
- Shared types belong in the relevant package (`@repo/trpc`, `@repo/rabbitmq`, domain aggregates)
- Use `interface` for object shapes that may be extended; `type` for unions/intersections

### Naming

- **Files:** `kebab-case.tsx` / `kebab-case.ts`
- **Components:** `PascalCase`
- **Hooks:** `useCamelCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Functions/variables:** `camelCase`
- **Astro pages:** `kebab-case.astro` or `index.astro` in named folder

### Commit Conventions (Conventional Commits + Gitmoji)

```
feat(scope): :sparkles: short description
fix(scope): :bug: short description
refactor(scope): :art: short description
```

Scope examples: `frontend/website`, `backend/cms`, `ui-web`, `infrastructure`

### Git Workflow

- **Always use branches + PRs** — direct pushes to `main` are blocked
- CI must pass before merge (lint, unit tests, integration tests)
- CD deploys automatically after CI passes on `main`

### Import Order

1. Node built-ins
2. External packages
3. Internal monorepo packages (`@repo/*`, `@backend/*`)
4. Local relative imports

### Testing

- **Unit tests:** Vitest, co-located as `*.spec.ts`
- **Integration tests:** `*.it.spec.ts`
- **E2E:** Playwright in `apps/e2e/`
- Run all: `pnpm test:unit`, `pnpm test:integration`, `pnpm test:e2e`

---

## 9. Key Development Commands

```bash
# Start all apps (native, no Docker)
pnpm dev

# Start dev containers (hot reload, direct port access)
pnpm compose:dev              # All services
pnpm compose:dev:core         # API + DB + Redis only
pnpm compose:dev:blog         # CMS + DB only

# Start staging (production-like, *.curator.local)
pnpm compose:staging          # Builds production images + nginx proxy
pnpm compose:staging:down     # Tear down

# Run frontend website only
pnpm --filter @frontend/website dev

# Type check
pnpm check-types

# Lint + Format
pnpm quality:lint:fix
pnpm quality:format:fix

# Database
pnpm db:generate              # Generate Prisma client
pnpm db:migrate:dev           # Run migrations locally
pnpm db:studio                # Open Prisma Studio

# Testing
pnpm test:unit                # Unit tests
pnpm test:unit:coverage       # With coverage
pnpm test:integration         # Integration tests
pnpm test:e2e                 # E2E tests

# Add a new ShadcnUI component to ui-web
cd packages/ui-web && pnpm ui add <component-name>

# Terraform (from infrastructure/ dir)
terraform init                # Initialize providers
terraform plan                # Preview changes
terraform apply               # Apply changes
```

---

## 10. Critical Files Reference

| File                                                   | Purpose                                            |
| ------------------------------------------------------ | -------------------------------------------------- |
| `packages/ui-web/src/globals.css`                      | CSS custom properties (design tokens)              |
| `packages/ui-web/src/components/custom/typography.tsx` | Typography component system                        |
| `packages/ui-web/tailwind.config.ts`                   | Tailwind design tokens (colors, fontSize)          |
| `apps/frontend/website/astro.config.mjs`               | Astro config (SSR, integrations, i18n)             |
| `apps/frontend/website/src/layouts/Base.astro`         | Root page layout                                   |
| `apps/backend/api/src/application/`                    | tRPC router definitions                            |
| `apps/backend/cms/src/payload.config.ts`               | Payload CMS configuration                          |
| `packages/rabbitmq/src/messages/`                      | RabbitMQ message pattern constants                 |
| `docker-compose.development.yaml`                      | Dev stack (hot reload, direct ports)               |
| `docker-compose.staging.yaml`                          | Staging (production-like, \*.curator.local)        |
| `docker-compose.production.yaml`                       | Production (Docker Swarm, SSL, \*.curator.com.br)  |
| `nginx/nginx.staging.conf`                             | Nginx reverse proxy for local staging              |
| `nginx/nginx.prod.conf`                                | Nginx reverse proxy for production (SSL + Certbot) |
| `infrastructure/main.tf`                               | Terraform root — Lightsail provisioning            |
| `infrastructure/modules/lightsail/`                    | Reusable Lightsail Terraform module                |
| `scripts/init-ssl.sh`                                  | One-time SSL certificate bootstrap (Certbot)       |
| `.github/workflows/ci-pull-request.yaml`               | CI pipeline (lint, test, SonarQube)                |
| `.github/workflows/cd-deploy.yaml`                     | CD pipeline (build, deploy to Lightsail)           |
| `turbo.json`                                           | Task pipeline (build, test, lint)                  |
| `pnpm-workspace.yaml`                                  | Dependency catalog (canonical versions)            |

---

## 11. Anti-Patterns (Never Do)

- **Do not** install Radix UI or ShadcnUI directly in an app — use `@repo/ui-web`
- **Do not** write inline font-size/font-weight Tailwind for headings — use Typography components
- **Do not** hardcode hex colors — use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`)
- **Do not** put business logic in NestJS controllers — use domain aggregates and application use cases
- **Do not** create a new package when an existing shared package can be extended
- **Do not** skip Zod validation for user-facing form inputs
- **Do not** add `client:load` to Astro components that don't need JS — keep islands minimal
- **Do not** push directly to `main` — always use branches + PRs
- **Do not** use static `upstream` blocks in nginx configs — use `resolver` + variables for Docker DNS resilience
- **Do not** use named Docker volumes for host paths like `/etc/letsencrypt` — use bind mounts
