import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      token: z.string(),
      userAgent: z.string().optional().nullable(),
      ipAddress: z.string().optional().nullable(),
      revoked: z.boolean().optional(),
      expiresAt: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const RefreshTokenCreateManyUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateManyUserInput>;
export const RefreshTokenCreateManyUserInputObjectZodSchema = makeSchema();
