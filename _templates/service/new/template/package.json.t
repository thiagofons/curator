---
to: apps/backend/<%= name %>/package.json
---
{
  "name": "@backend/<%= name %>",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "lint": "eslint . --max-warnings 0",
    "test": "pnpm test:unit && pnpm test:integration",
    "test:unit": "vitest run -c vitest.config.unit.ts",
    "test:unit:coverage": "vitest run --coverage -c vitest.config.unit.ts",
    "test:unit:watch": "vitest -c vitest.config.unit.ts",
    "test:integration": "dotenv -e .env.test -- vitest run -c vitest.config.it.ts",
    "test:integration:watch": "dotenv -e .env.test -- vitest -c vitest.config.it.ts"
  },
  "dependencies": {
    "@nestjs/common": "catalog:nestjs10",
    "@nestjs/core": "catalog:nestjs10",
    "@prisma/client": "catalog:prisma6",
    "dotenv": "catalog:tooling"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@repo/eslint-config": "workspace:*",
    "@nestjs/testing": "catalog:nestjs10",
    "@types/node": "catalog:tooling",
    "dotenv-cli": "catalog:tooling",
    "eslint": "^9.39.1",
    "prisma": "catalog:prisma6",
    "supertest": "catalog:testing",
    "typescript": "catalog:tooling",
    "vitest": "catalog:testing"
  }
}
