#!/usr/bin/env node
// Applies pending migrations for ALL schemas (non-interactive).
// Intended for CI/CD and production deployments.
import { readdirSync } from "fs";
import { execSync } from "child_process";
import { join, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const prismaDir = join(__dirname, "../prisma");

const schemas = readdirSync(prismaDir).filter((f) => f.endsWith(".prisma"));

if (schemas.length === 0) {
  console.error("❌ No .prisma files found in prisma/");
  process.exit(1);
}

console.log(`🚀 Deploying migrations for ${schemas.length} schema(s): ${schemas.join(", ")}\n`);

let hasError = false;

for (const schemaFile of schemas) {
  const target = basename(schemaFile, ".prisma");
  console.log(`→ Deploying migrations for: ${target}`);
  try {
    execSync(`prisma migrate deploy --schema=prisma/${schemaFile}`, {
      stdio: "inherit",
      env: { ...process.env, PRISMA_TARGET: target },
      cwd: join(__dirname, ".."),
    });
  } catch {
    console.error(`❌ Migration deploy failed for: ${target}`);
    hasError = true;
  }
}

if (hasError) process.exit(1);
