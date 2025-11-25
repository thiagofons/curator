# E2E Tests

This directory contains the end-to-end (E2E) tests for the Curator monorepo. Tests use Playwright Test and perform HTTP calls to the `api-gateway` (tRPC) to validate business flows and infrastructure checks (DB, RabbitMQ, etc.).

**Test locations**

- `helpers/`: reusable helpers (e.g. `trpc.ts`).
- `tests/health/`: infrastructure and health checks (`db-connection`, `rabbitmq-connection`).
- `tests/services/`: (optional) per-microservice tests (smoke / contract tests).
- `tests/flows/`: multi-service flows (user journeys).

**Prerequisites**

- Node >= 18
- `pnpm` (version as defined in `package.json`)
- RabbitMQ, Postgres and the microservices running (locally via Docker Compose or another dev environment)

We recommend using the `core` profile in `docker compose` to start the broker + essential services:

```bash
# from the repository root
pnpm compose:core
```

Environment variables used by the compose file are defined in `.env.development` (make sure `RABBITMQ_URI`, `DATABASE_URL`, etc. are set).

**Running the tests**

From the `apps/e2e` directory:

```bash
cd apps/e2e
pnpm install     # if dependencies haven't been installed
pnpm test:e2e    # run the full Playwright suite
```

Run only the `health` folder:

```bash
pnpm test:e2e tests/health
```

Run a specific file:

```bash
pnpm test:e2e tests/health/rabbitmq-connection.spec.ts
```

Filter by text (grep):

```bash
pnpm test:e2e --grep "RabbitMQ"
```

**Helpers**

- `helpers/trpc.ts` — helper to call the API Gateway tRPC endpoints. Use `callTrpc(request, 'router', 'method')` inside Playwright tests to reduce boilerplate.

Quick example in a spec:

```ts
import { callTrpc } from "@/helpers/trpc";

test("health check", async ({ request }) => {
  const result = await callTrpc(request, "authentication", "testRabbitMQ");
  expect(result.success).toBe(true);
});
```

**CI / Recommendations**

- Suggested pipeline:
  1.  Start infrastructure (docker compose with RabbitMQ + DB + services)
  2.  Wait for health checks (e.g. `curl` the API Gateway endpoints)
  3.  Run `pnpm test:e2e`
  4.  Tear down the stack
- Run health checks as an initial step so the pipeline fails fast when infrastructure is unavailable.

**Debugging**

- Container logs: `docker compose -f docker-compose.yaml --env-file=.env.development logs -f <service>`
- Test an API Gateway tRPC endpoint with `curl` to confirm response format.

If you want, I can add a `helpers/rabbitmq.ts` to inspect broker queues directly (useful for tests that validate publish/consume without going through the gateway). I can also create a GitHub Actions workflow that brings up RabbitMQ and runs these E2E tests.
