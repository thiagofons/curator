import { env } from "@/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./client";

// 1. O TypeScript garante que env.AUTH_DATABASE_URL é uma string válida
const pool = new Pool({ connectionString: env.ROADMAP_DATABASE_URL });

// 2. Passamos para o Adapter
const adapter = new PrismaPg(pool);

// 3. Instanciamos o Client
export const prismaRoadmap = new PrismaClient({ adapter });
export * from "./client";
