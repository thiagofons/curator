import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const RefreshTokenOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RefreshTokenOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenOrderByRelationAggregateInput>;
export const RefreshTokenOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
