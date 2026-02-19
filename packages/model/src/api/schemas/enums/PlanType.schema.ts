import * as z from "zod";

export const PlanTypeSchema = z.enum(["FREE", "PRO"]);

export type PlanType = z.infer<typeof PlanTypeSchema>;
