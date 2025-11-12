# 🚀 NestJS Microservice Template (Curator Platform)

This directory is a template ("starter-kit") for creating new NestJS microservices within the Curator monorepo.

The goal is to eliminate setup time and ensure that all new services follow the same architectural, testing, and DX (Developer Experience) standards from day one.

---

## ✨ Pre-configured Features

This template comes with:

- **NestJS Base:** Standard `AppModule`, `AppService`, and `main.ts` structure.
- **Monorepo Integration:** `package.json` and `tsconfig.json` pre-configured for `pnpm workspaces` and `Turborepo`.
- **Lint & Format:** `eslint` and `prettier` configured to inherit the monorepo rules (via `@curator/eslint-config-nest`).
- **Prisma:** Prisma dependencies and `prisma` CLI installed (schema needs to be created).

### 🏆 Testing Setup (Vitest)

The main feature of this template is the pre-configured testing stack, aligned with our **ADR 003 (Testing Trophy)**:

1.  **Unit Tests (`.spec.ts`)**
    - Config: `vitest.config.unit.ts`
    - Script: `pnpm run test:unit`
    - Runs only pure logic tests, excluding integration tests.

2.  **Integration Tests (`.it.spec.ts`)**
    - Config: `vitest.config.it.ts`
    - Script: `pnpm run test:it`
    - **Database Orchestration:**
      - `src/test/global-setup.ts`: Resets and migrates the test database (via `prisma migrate reset`) before the test suite runs.
      - `src/test/setup-integration.ts`: Cleans all table data **before each test** to ensure isolation.
    - **Environment:** Automatically loads the `.env.test` file via `dotenv-cli`.

---

## 🏃‍♂️ How to Use (Workflow)

To create a new microservice (e.g., `identity-service`):

1.  **Copy the Template:**

    ```bash
    cp -r packages/nest-service-template apps/identity-service
    ```

2.  **Navigate and Install:**

    ```bash
    cd apps/identity-service
    pnpm install
    ```

    _(This will link the workspace packages, like `@curator/eslint-config-nest`)_

3.  **Rename Placeholders:**
    - In `package.json`, change `"@curator/{{SERVICE_NAME}}"` to `"@curator/identity-service"`.
    - Copy `.env.test.example` to `.env.test`.
    - In `.env.test`, change `{{DB_NAME_TEST}}` to your test database name (e.g., `identity_test`). Don't forget to create this database in PostgreSQL.

4.  **Configure Prisma & Tests:**
    - Create your `prisma/schema.prisma` file with your Bounded Context's models (e.g., `model User { ... }`).
    - **VERY IMPORTANT:** Edit `src/test/setup-integration.ts` and add the `deleteMany()` commands to clean your new tables (e.g., `await prisma.user.deleteMany()`).

5.  **Verify the Setup:**
    - Run `pnpm prisma migrate dev` (for your local development database).
    - Run `pnpm run test:it`. The `global-setup` will prepare your `identity_test` database, and the example tests should pass.

---

## 📜 Available Scripts

- `pnpm run dev`: Starts NestJS in watch mode.
- `pnpm run build`: Compiles the service for production (used by Turborepo).
- `pnpm run lint`: Runs ESLint.
- `pnpm run test:unit`: Runs **only** the fast unit tests.
- `pnpm run test:it`: Runs **only** the (slow) database integration tests.
- `pnpm run test`: Runs both `unit` and `it`.
