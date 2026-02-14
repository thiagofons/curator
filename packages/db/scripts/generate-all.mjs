#!/usr/bin/env node
// Discovers all *.prisma files in prisma/ and runs `prisma generate` for each one.
// PRISMA_TARGET is derived from the filename (e.g. auth.prisma → PRISMA_TARGET=auth).
import { readdirSync } from "fs";
import { execSync } from "child_process";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const prismaDir = join(__dirname, "../prisma");

const schemas = readdirSync(prismaDir).filter((f) => f.endsWith(".prisma"));

if (schemas.length === 0) {
  console.error("❌ Nenhum arquivo .prisma encontrado em prisma/");
  process.exit(1);
}

console.log(`🔍 ${schemas.length} schema(s) encontrado(s): ${schemas.join(", ")}\n`);

let hasError = false;

for (const schemaFile of schemas) {
  const target = basename(schemaFile, ".prisma");
  console.log(`→ Gerando client para: ${target}`);
  try {
    execSync(`prisma generate --schema=prisma/${schemaFile}`, {
      stdio: "inherit",
      env: { ...process.env, PRISMA_TARGET: target },
      cwd: join(__dirname, ".."),
    });
  } catch {
    console.error(`❌ Falha ao gerar client para: ${target}`);
    hasError = true;
  }
}

if (hasError) process.exit(1);
