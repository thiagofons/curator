import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { PlanTypeSchema } from "../enums/PlanType.schema";

const makeSchema = () =>
  z
    .object({
      set: PlanTypeSchema.optional(),
    })
    .strict();
export const EnumPlanTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPlanTypeFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumPlanTypeFieldUpdateOperationsInput>;
export const EnumPlanTypeFieldUpdateOperationsInputObjectZodSchema =
  makeSchema();
