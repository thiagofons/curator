import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  API_DATABASE_URL: z
    .string()
    .url("A URL do banco API é inválida ou está faltando no .env"),

  PRISMA_TARGET: z.enum(["api"]).optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Erro fatal: Variáveis de ambiente do banco de dados inválidas!",
  );
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
