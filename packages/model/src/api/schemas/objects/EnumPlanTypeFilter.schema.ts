import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { PlanTypeSchema } from "../enums/PlanType.schema";
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
          z.lazy(() => NestedEnumPlanTypeFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const EnumPlanTypeFilterObjectSchema: z.ZodType<Prisma.EnumPlanTypeFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumPlanTypeFilter>;
export const EnumPlanTypeFilterObjectZodSchema = makeSchema();
