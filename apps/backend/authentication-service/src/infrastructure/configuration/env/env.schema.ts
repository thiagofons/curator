import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),
  RABBITMQ_URI: z.coerce.string().optional(),
});

export type Env = z.infer<typeof envSchema>;
