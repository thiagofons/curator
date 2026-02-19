import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      token: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      userAgent: SortOrderSchema.optional(),
      ipAddress: SortOrderSchema.optional(),
      revoked: SortOrderSchema.optional(),
      expiresAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const RefreshTokenMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RefreshTokenMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenMaxOrderByAggregateInput>;
export const RefreshTokenMaxOrderByAggregateInputObjectZodSchema = makeSchema();
