import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      token: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      userAgent: z.literal(true).optional(),
      ipAddress: z.literal(true).optional(),
      revoked: z.literal(true).optional(),
      expiresAt: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
    })
    .strict();
export const RefreshTokenMinAggregateInputObjectSchema: z.ZodType<Prisma.RefreshTokenMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenMinAggregateInputType>;
export const RefreshTokenMinAggregateInputObjectZodSchema = makeSchema();
