import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { RefreshTokenOrderByRelationAggregateInputObjectSchema as RefreshTokenOrderByRelationAggregateInputObjectSchema } from "./RefreshTokenOrderByRelationAggregateInput.schema";
import { AccountOrderByRelationAggregateInputObjectSchema as AccountOrderByRelationAggregateInputObjectSchema } from "./AccountOrderByRelationAggregateInput.schema";

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      email: SortOrderSchema.optional(),
      password: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      role: SortOrderSchema.optional(),
      plan: SortOrderSchema.optional(),
      isPro: SortOrderSchema.optional(),
      isActive: SortOrderSchema.optional(),
      lastLoginAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      refreshTokens: z
        .lazy(() => RefreshTokenOrderByRelationAggregateInputObjectSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
