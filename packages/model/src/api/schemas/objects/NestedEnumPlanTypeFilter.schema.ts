import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { PlanTypeSchema } from "../enums/PlanType.schema";

const nestedenumplantypefilterSchema = z
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
export const NestedEnumPlanTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumPlanTypeFilter> =
  nestedenumplantypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPlanTypeFilter>;
export const NestedEnumPlanTypeFilterObjectZodSchema =
  nestedenumplantypefilterSchema;
