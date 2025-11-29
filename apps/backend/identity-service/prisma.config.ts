import { defineConfig } from "prisma/config";

/**
 * Prisma 7 Configuration for Identity Service
 *
 * This file exports the database configuration for migrations.
 * The connection URL is read from the DATABASE_URL environment variable.
 *
 * @see https://pris.ly/d/config-datasource
 * @see https://pris.ly/d/prisma7-client-config
 */
export default defineConfig({
  schema: "./src/infrastructure/persistence/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://placeholder",
  },
});
