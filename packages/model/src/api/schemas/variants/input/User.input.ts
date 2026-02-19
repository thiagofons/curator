import * as z from "zod";
import { RoleSchema } from "../../enums/Role.schema";
import { PlanTypeSchema } from "../../enums/PlanType.schema";
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    name: z.string().optional().nullable(),
    email: z.string(),
    password: z.string().optional().nullable(),
    role: RoleSchema,
    plan: PlanTypeSchema,
    isPro: z.boolean(),
    isActive: z.boolean(),
    lastLoginAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    refreshTokens: z.array(z.unknown()),
    accounts: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
