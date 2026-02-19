import * as z from "zod";
export const UserDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string(),
    password: z.string().optional(),
    role: z.unknown(),
    plan: z.unknown(),
    isPro: z.boolean(),
    isActive: z.boolean(),
    lastLoginAt: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    refreshTokens: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
  }),
);
