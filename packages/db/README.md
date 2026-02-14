# @repo/db

Shared database package for the Curator monorepo. Manages Prisma schemas, generated clients, and Zod validators for all services that need database access.

## Overview

Each database domain (e.g. `auth`, `roadmap`) has its own:

- **Prisma schema** — `prisma/<name>.prisma`
- **Generated Prisma Client** — `src/<name>/client/`
- **Generated Zod schemas** — `packages/model/src/generated/<name>/`

The package uses [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql#using-the-pg-driver) for connection pooling via `pg`, making it compatible with serverless and edge environments.

## Environment Variables

Variables are loaded from the root `.env.development` file. The naming convention is:

```
<SCHEMA_NAME>_DATABASE_URL=postgresql://...
```

| Variable               | Schema    | Description                   |
| ---------------------- | --------- | ----------------------------- |
| `AUTH_DATABASE_URL`    | `auth`    | PostgreSQL URL for auth DB    |
| `ROADMAP_DATABASE_URL` | `roadmap` | PostgreSQL URL for roadmap DB |

> To add a new schema, create `prisma/<name>.prisma` and add `<NAME>_DATABASE_URL` to `.env.development`. No other configuration is required.

## Scripts

| Script              | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `db:generate`       | Generates Prisma clients and Zod schemas for **all** schemas        |
| `db:migrate:dev`    | Creates a new migration for a single schema (interactive)           |
| `db:migrate:deploy` | Applies pending migrations for **all** schemas (CI/production)      |
| `db:push:auth`      | Pushes the `auth` schema directly, no migration (prototype only)    |
| `db:push:roadmap`   | Pushes the `roadmap` schema directly, no migration (prototype only) |
| `build`             | Compiles TypeScript to `dist/`                                      |
| `dev`               | Watches and recompiles on change                                    |

### Running from the monorepo root

```bash
pnpm db:generate                    # Generate all clients + Zod schemas
pnpm db:push:auth:dev               # Push auth schema (development, no migration history)
pnpm db:push:auth:prod              # Push auth schema (production, no migration history)
```

### Running migrations

```bash
# Development — creates a new migration file for one schema (interactive)
pnpm --filter @repo/db db:migrate:dev auth
pnpm --filter @repo/db db:migrate:dev auth add_email_column   # with explicit name

# Production / CI — applies all pending migrations across all schemas
pnpm --filter @repo/db db:migrate:deploy
```

## How the Scripts Work

All scripts share the same convention: `PRISMA_TARGET` is derived from the `.prisma` filename and used by `prisma.config.ts` to resolve `<TARGET>_DATABASE_URL`.

```
prisma/auth.prisma     →  PRISMA_TARGET=auth     →  AUTH_DATABASE_URL
prisma/roadmap.prisma  →  PRISMA_TARGET=roadmap  →  ROADMAP_DATABASE_URL
prisma/identity.prisma →  PRISMA_TARGET=identity →  IDENTITY_DATABASE_URL
```

| Script file                  | Behavior                                                           |
| ---------------------------- | ------------------------------------------------------------------ |
| `scripts/generate-all.mjs`   | Iterates all schemas, runs `prisma generate` for each              |
| `scripts/migrate-dev.mjs`    | Takes `<target>` as arg, runs `prisma migrate dev` for that schema |
| `scripts/migrate-deploy.mjs` | Iterates all schemas, runs `prisma migrate deploy` for each        |

## Adding a New Schema

1. Create `prisma/<name>.prisma` with the desired models and generators.
2. Add `<NAME>_DATABASE_URL=postgresql://...` to the root `.env.development`.
3. Run `pnpm db:generate` — the new client and Zod types are generated automatically.
4. Export the new client from `src/<name>/index.ts` and register it in `package.json` exports.

## Usage

```ts
import { prismaAuth } from "@repo/db/auth";

const user = await prismaAuth.user.findUnique({ where: { id } });
```
