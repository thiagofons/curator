import { z } from "zod";

// Removemos as importações do 'dotenv' e 'path'!
// Quem injeta o process.env agora é o Turborepo ou o App que consome este pacote.

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  AUTH_DATABASE_URL: z
    .string()
    .url("A URL do banco Auth é inválida ou está faltando no .env"),
  ROADMAP_DATABASE_URL: z
    .string()
    .url("A URL do banco Roadmap é inválida ou está faltando no .env"),

  PRISMA_TARGET: z.enum(["auth", "roadmap"]).optional(),
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
