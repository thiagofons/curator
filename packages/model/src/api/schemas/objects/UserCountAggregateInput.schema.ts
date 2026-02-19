import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      name: z.literal(true).optional(),
      email: z.literal(true).optional(),
      password: z.literal(true).optional(),
      role: z.literal(true).optional(),
      plan: z.literal(true).optional(),
      isPro: z.literal(true).optional(),
      isActive: z.literal(true).optional(),
      lastLoginAt: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const UserCountAggregateInputObjectSchema: z.ZodType<Prisma.UserCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountAggregateInputType>;
export const UserCountAggregateInputObjectZodSchema = makeSchema();
