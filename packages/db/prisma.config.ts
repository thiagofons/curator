/// <reference types="node" />
import { defineConfig } from "@prisma/config";

// PRISMA_TARGET is only required for commands that need a DB connection (push, migrate, studio).
// For `prisma generate`, it is intentionally left unset.
// Convention: PRISMA_TARGET=auth → AUTH_DATABASE_URL, PRISMA_TARGET=identity → IDENTITY_DATABASE_URL, etc.
const target = process.env.PRISMA_TARGET;

const url = target
  ? process.env[`${target.toUpperCase()}_DATABASE_URL`]
  : undefined;

export default defineConfig(
  url
    ? {
        datasource: { url },
      }
    : {},
);
