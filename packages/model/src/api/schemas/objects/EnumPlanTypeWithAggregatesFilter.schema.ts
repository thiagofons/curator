import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { PlanTypeSchema } from "../enums/PlanType.schema";
import { NestedEnumPlanTypeWithAggregatesFilterObjectSchema as NestedEnumPlanTypeWithAggregatesFilterObjectSchema } from "./NestedEnumPlanTypeWithAggregatesFilter.schema";
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";
import { NestedEnumPlanTypeFilterObjectSchema as NestedEnumPlanTypeFilterObjectSchema } from "./NestedEnumPlanTypeFilter.schema";

const makeSchema = () =>
  z
    .object({
      equals: PlanTypeSchema.optional(),
      in: PlanTypeSchema.array().optional(),
      notIn: PlanTypeSchema.array().optional(),
      not: z
        .union([
          PlanTypeSchema,
          z.lazy(() => NestedEnumPlanTypeWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumPlanTypeFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumPlanTypeFilterObjectSchema).optional(),
    })
    .strict();
export const EnumPlanTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPlanTypeWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumPlanTypeWithAggregatesFilter>;
export const EnumPlanTypeWithAggregatesFilterObjectZodSchema = makeSchema();
