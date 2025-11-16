import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),
  RABBITMQ_URI: z.string().url(),
  DATABASE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
