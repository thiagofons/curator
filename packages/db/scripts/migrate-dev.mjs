#!/usr/bin/env node
// Runs `prisma migrate dev` for a single schema.
// Usage: node scripts/migrate-dev.mjs <target> [migration-name]
//   target          — schema name, e.g. "auth" (matches prisma/<target>.prisma)
//   migration-name  — optional migration name (passed as --name). If omitted, Prisma prompts.
//
// Example:
//   pnpm db:migrate:dev auth
//   pnpm db:migrate:dev auth add_email_column
import { execSync } from "child_process";

const [target, migrationName] = process.argv.slice(2);

if (!target) {
  console.error("❌ Usage: node scripts/migrate-dev.mjs <target> [migration-name]");
  console.error("   Example: node scripts/migrate-dev.mjs auth add_user_table");
  process.exit(1);
}

const nameFlag = migrationName ? `--name "${migrationName}"` : "";

console.log(`→ Running migrate dev for schema: ${target}`);

execSync(`prisma migrate dev --schema=prisma/${target}.prisma ${nameFlag}`, {
  stdio: "inherit",
  env: { ...process.env, PRISMA_TARGET: target },
  cwd: new URL("..", import.meta.url).pathname,
});
