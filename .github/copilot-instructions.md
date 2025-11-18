# AI Copilot Instructions for Curator Monorepo

This guide helps AI agents understand the Curator codebase architecture, conventions, and workflows.

## 🏗️ Architecture Overview

**Curator** is a monorepo using **Turborepo** + **pnpm workspaces** with a **Domain-Driven Design (DDD)** + **Microservices** approach.

### Workspace Structure

```
apps/
  backend/          # NestJS microservices (DDD pattern)
    api-gateway/    # Entry point for all external APIs
    identity-service/
    authentication-service/
    agent/
  frontend/         # Next.js, Astro, Storybook, Playwright E2E
packages/
  ui-web/           # Shared shadcn React components (Radix UI)
  ui-mobile/        # React Native components
  trpc/             # typesafe API layer
  rabbitmq/         # Message broker wrapper
  vitest-config/    # Shared testing configuration
  eslint-config/    # Shared linting rules
  typescript-config/
  lib/              # Utility functions
```

### Critical Data Flows

1. **Frontend → API Gateway (tRPC)** → Route to microservices
2. **Async Communication**: RabbitMQ event-driven between services
3. **Database**: PostgreSQL (Prisma ORM) per microservice
4. **Observability**: OpenTelemetry → Grafana/Prometheus/Loki/Tempo

## 🛠️ Developer Workflows

### Dependency Management

- **Package manager**: `pnpm` (v9.5.0+)
- **Catalogs** (pnpm-workspace.yaml): Define canonical versions across workspaces
- **Workspace references**: Use `workspace:*` for internal packages
- Add deps: `pnpm add @repo/ui-web -w` (at root) or `cd apps/backend && pnpm add`
- Update: `pnpm turbo run db:generate` (Prisma), `pnpm install` (lock file)

### Build & Dev

- **Build all**: `pnpm build` → runs Turbo with caching
- **Dev mode**: `pnpm dev` → concurrent dev servers (persistent, uncached)
- **Database**:
  - `pnpm db:generate` → Prisma client generation
  - `pnpm db:migrate:dev` → Create migration + apply
  - `pnpm db:studio` → Open Prisma Studio
- **Docker**: `pnpm compose:core` → spins up PostgreSQL, RabbitMQ, Redis

### Code Quality Pipeline (Git Hooks)

**Pre-push** (`husky`):

1. `pnpm turbo run test:unit:coverage` (abort if fails)
2. `pnpm turbo run build` (abort if fails)

**Pre-commit** (`lint-staged`):

- `prettier --write` (all file types)
- `eslint --fix` (TS/TSX/JS/JSX)

Manual quality checks:

- `pnpm quality:lint:check` → ESLint
- `pnpm quality:format:check` → Prettier
- `pnpm quality:lint:fix` / `pnpm quality:format:fix`

## 📋 Testing Strategy (Testing Trophy)

**Policy**: Prefer integration tests when behavior depends on I/O (DB/HTTP). Keep E2E small (smoke + critical journeys).

### Test Layers (Bottom → Top)

1. **Static Analysis** (TypeScript + ESLint + Prettier) — fastest feedback
2. **Unit Tests** (Vitest) — pure domain logic, no mocks unless isolated
3. **Integration Tests** (Vitest + supertest + Prisma test DB) — core value layer
4. **E2E Tests** (Playwright) — critical user journeys only

### Running Tests

```bash
pnpm test:unit                # All unit tests
pnpm test:unit:coverage       # With coverage thresholds
pnpm test:integration         # Integration tests
pnpm test:e2e                 # E2E tests
pnpm test:unit --watch        # Dev mode
```

### Vitest Configuration

- **Globals**: `globals: true` (no `import { describe, it, expect }`)
- **Environment**: `jsdom` (React components)
- **Shared config**: `@repo/vitest-config/src/index.ts`
- Each package has `vitest.config.ts` extending `sharedConfig`

## 🎨 React Components (shadcn/ui)

### Location & Structure

- **Base components**: `packages/ui-web/src/components/base/*.tsx`
- **Stories**: `base/*.stories.tsx` (Storybook)
- **Styling**: TailwindCSS + CVA (class-variance-authority) for variants
- **Accessible**: Use Radix UI primitives + WAI-ARIA

### Component Pattern (Example: Button)

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"; // Slot for composition
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
```

### Testing Components

- Use `@testing-library/react` for user-centric tests
- Render with `render()`, query with `screen.getBy*()`, `waitFor()`
- Test accessibility: ARIA labels, keyboard navigation, focus management
- Mock provider context at test level (e.g., `TooltipProvider`)

## 🏛️ Backend Architecture (DDD)

### Service Structure

```
src/
  domain/          # Pure business logic (no dependencies)
    aggregates/    # Root entities (e.g., User)
    value-objects/ # Immutable types
    repositories/  # Interfaces only
  application/     # Use cases + DTOs
    use-cases/
    controllers/
  infrastructure/  # Prisma, RabbitMQ, external services
    persistence/
    messaging/
```

### Key Conventions

- **Factory Methods**: Aggregates use static `create()` to enforce invariants
- **No anemic models**: All business rules live in domain aggregates
- **NestJS + tRPC**: API routes → Controllers → Use Cases → Domain
- **Testing**: Domain logic unit tests (no DB), application integration tests (with DB)

## 📚 Important Patterns

### pnpm Workspace Catalog

Versions centralized in `pnpm-workspace.yaml`:

```yaml
catalogs:
  react19:
    react: ^19.2.0
    react-dom: ^19.2.0
  nestjs11:
    "@nestjs/core": ^11.0.1
```

Reference via `catalog:react19` in `package.json` (auto-resolved).

### Turborepo Task Dependencies

In `turbo.json`:

- `dependsOn: ["^build"]` → waits for dependencies' build first
- `cache: false` → skip caching (for dev, watch, E2E)
- `persistent: true` → keep running (dev servers)
- Outputs tracked for caching: `dist/**`, `.next/**`

### Internal Imports

Use path aliases (configured in `tsconfig.json`):

```tsx
// ✅ Good
import { Button } from "@repo/ui-web/base/button";
import { sum } from "@repo/lib";

// ❌ Avoid relative paths across workspaces
import { Button } from "../../../../packages/ui-web/src/components/base/button";
```

### Environment Variables

- Root `.env` / `.env.development` / `.env.production`
- Per-service: `apps/backend/SERVICE/.env.example` (documented template)
- CI/CD: GitHub Actions secrets + AWS Secrets Manager
- Global vars in `turbo.json#globalEnv` invalidate Turbo cache

## 🧬 Common Tasks

### Add a New shadcn Component

1. Find inspiration in `packages/ui-web/src/components/base/*.tsx`
2. Use Radix UI primitive + CVA for variants
3. Add `.stories.tsx` for Storybook
4. Add `.spec.ts` with accessibility + interactivity tests
5. Export in `base/index.ts` if needed

### Add a New Backend Service

1. `pnpm new:service` → hygen template → fills DDD structure
2. Setup Prisma schema in `prisma/schema.prisma`
3. Run `pnpm db:generate` in that service
4. Write domain logic in `src/domain/aggregates/`
5. Wire NestJS controllers in `src/application/controllers/`
6. Add integration tests with real DB (test environment from Turbo task)

### Debug a Failing Test

1. **Local run**: `cd packages/ui-web && pnpm test:unit --watch`
2. **Inspect**: Add `console.log()` or use VS Code debugger (`--inspect-brk`)
3. **Coverage**: `pnpm test:unit:coverage` → view `coverage/` reports
4. **CI logs**: GitHub Actions artifacts + real-time streaming

### Deploy / Build

1. All checks pass: `pnpm turbo run build` (caches results)
2. Docker: Each service has `Dockerfile` → pushed to registry
3. Infrastructure: Terraform in `infrastructure/` → AWS EKS/AppService
4. E2E: Playwright validates production smoke tests

## 🚀 Useful Commands Reference

```bash
# Monorepo
pnpm install              # Install all deps
pnpm build                # Parallel build (cached)
pnpm dev                  # Concurrent dev servers

# Testing
pnpm test:unit            # Fast feedback
pnpm test:unit:coverage   # With thresholds
pnpm test:integration     # Real DB integration
pnpm test:e2e             # Playwright

# Quality
pnpm quality:lint:check   # ESLint check
pnpm quality:lint:fix     # Auto-fix linting
pnpm quality:format:fix   # Prettier reformat

# Database
pnpm db:generate          # Prisma client
pnpm db:migrate:dev       # Create + apply migration
pnpm db:studio            # Web UI for DB

# Docker
pnpm compose:core         # PostgreSQL + RabbitMQ + Redis
pnpm compose:down         # Stop all services

# CLI Helper
pnpm curator              # Interactive menu (build, test, scaffold)
```

## 📖 Key Documentation Files

- **Architecture Decisions**: `apps/frontend/docs/src/content/architecture/adr/` (003-testing-trophy.mdx)
- **Testing Strategy**: `apps/frontend/docs/src/content/developer-experience/testing-strategy.mdx`
- **README root**: Full tech stack + badges

## ⚠️ Common Pitfalls

1. **Circular dependencies**: Backend services should not import each other; use shared libs or async messaging
2. **Mocking in unit tests**: Unit tests should test pure logic; if mocking heavy, move to integration test
3. **Forgetting Turbo cache**: Always use `pnpm turbo run <task>` not `pnpm run <task>` directly
4. **Old TypeScript versions**: Ensure `typescript: catalog:tooling` in devDeps (v5.9.2+)
5. **Missing Prettier runs**: Pre-commit hook handles it, but manual `pnpm quality:format:fix` if needed
