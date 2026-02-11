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
│   │   ├── website/        # Astro 5 SSR — public blog + landing
│   │   ├── docs/           # Next.js 16 + Nextra — developer docs
│   │   └── storybook/      # Storybook 9 — component explorer
│   └── backend/
│       ├── api-gateway/    # NestJS 11 + tRPC — central entry point (port 3300)
│       ├── cms-service/    # Next.js 16 + Payload CMS 3 — headless CMS (port 3000)
│       ├── authentication-service/  # NestJS 11 + Prisma (port 3301)
│       └── identity-service/        # NestJS 11 + Prisma (port 3302)
├── packages/
│   ├── ui-web/             # @repo/ui-web — shared React component library
│   ├── ui-mobile/          # @repo/ui-mobile — React Native components
│   ├── trpc/               # @repo/trpc — typed tRPC client
│   ├── rabbitmq/           # @repo/rabbitmq — NestJS RabbitMQ wrapper
│   ├── lib/                # @repo/lib — general utilities
│   ├── eslint-config/      # Shared ESLint config
│   ├── typescript-config/  # Shared tsconfig templates
│   └── vitest-config/      # Shared Vitest config
├── k8s/                    # Kubernetes manifests (Kustomize)
├── infrastructure/         # Terraform / IaC
├── observability/          # Grafana, Prometheus, Loki configs
└── docker-compose.yaml     # Local dev stack
```

**Workspace package aliases:** `@repo/ui-web`, `@repo/trpc`, `@repo/rabbitmq`, `@repo/lib`, `@backend/api-gateway`, `@backend/cms-service`, etc.

---

## 3. Frontend: Astro Website (`apps/frontend/website`)

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

## 4. Design System: `@repo/ui-web`

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

## 5. Backend: NestJS Services

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
// Router definition (api-gateway)
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
// Publisher (API Gateway)
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

Frontend fetches content via Payload's REST API or GraphQL.

---

## 6. Code Conventions

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

Scope examples: `frontend/website`, `backend/cms-service`, `ui-web`

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

## 7. Key Development Commands

```bash
# Start all apps
pnpm dev

# Start only core backend services (Docker)
pnpm compose:core

# Run frontend website only
pnpm --filter @frontend/website dev

# Type check
pnpm check-types

# Lint + Format
pnpm quality:lint:fix
pnpm quality:format:fix

# Add a new ShadcnUI component to ui-web
cd packages/ui-web && pnpm ui add <component-name>

# Kubernetes dev (local Kind cluster)
pnpm k8s:dev
```

---

## 8. Critical Files Reference

| File                                                   | Purpose                                   |
| ------------------------------------------------------ | ----------------------------------------- |
| `packages/ui-web/src/globals.css`                      | CSS custom properties (design tokens)     |
| `packages/ui-web/src/components/custom/typography.tsx` | Typography component system               |
| `packages/ui-web/tailwind.config.ts`                   | Tailwind design tokens (colors, fontSize) |
| `apps/frontend/website/astro.config.mjs`               | Astro config (SSR, integrations, i18n)    |
| `apps/frontend/website/src/layouts/Base.astro`         | Root page layout                          |
| `apps/backend/api-gateway/src/application/`            | tRPC router definitions                   |
| `packages/rabbitmq/src/messages/`                      | RabbitMQ message pattern constants        |
| `docker-compose.yaml`                                  | Full local dev stack                      |
| `turbo.json`                                           | Task pipeline (build, test, lint)         |
| `pnpm-workspace.yaml`                                  | Dependency catalog (canonical versions)   |

---

## 9. Anti-Patterns (Never Do)

- **Do not** install Radix UI or ShadcnUI directly in an app — use `@repo/ui-web`
- **Do not** write inline font-size/font-weight Tailwind for headings — use Typography components
- **Do not** hardcode hex colors — use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`)
- **Do not** put business logic in NestJS controllers — use domain aggregates and application use cases
- **Do not** create a new package when an existing shared package can be extended
- **Do not** skip Zod validation for user-facing form inputs
- **Do not** add `client:load` to Astro components that don't need JS — keep islands minimal
