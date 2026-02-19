import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      role: SortOrderSchema.optional(),
      plan: SortOrderSchema.optional(),
      isPro: SortOrderSchema.optional(),
      isActive: SortOrderSchema.optional(),
      lastLoginAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountOrderByAggregateInput>;
export const UserCountOrderByAggregateInputObjectZodSchema = makeSchema();
