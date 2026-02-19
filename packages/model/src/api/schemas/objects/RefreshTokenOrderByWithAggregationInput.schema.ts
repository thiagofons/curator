import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { RefreshTokenCountOrderByAggregateInputObjectSchema as RefreshTokenCountOrderByAggregateInputObjectSchema } from "./RefreshTokenCountOrderByAggregateInput.schema";
import { RefreshTokenMaxOrderByAggregateInputObjectSchema as RefreshTokenMaxOrderByAggregateInputObjectSchema } from "./RefreshTokenMaxOrderByAggregateInput.schema";
import { RefreshTokenMinOrderByAggregateInputObjectSchema as RefreshTokenMinOrderByAggregateInputObjectSchema } from "./RefreshTokenMinOrderByAggregateInput.schema";

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      token: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      userAgent: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      ipAddress: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      revoked: SortOrderSchema.optional(),
      expiresAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => RefreshTokenCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => RefreshTokenMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => RefreshTokenMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const RefreshTokenOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput>;
export const RefreshTokenOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
