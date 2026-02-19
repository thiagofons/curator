import * as z from "zod";
import { RoleSchema } from "../../enums/Role.schema";
import { PlanTypeSchema } from "../../enums/PlanType.schema";
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    password: z.string().nullable(),
    role: RoleSchema,
    plan: PlanTypeSchema,
    isPro: z.boolean(),
    isActive: z.boolean(),
    lastLoginAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    refreshTokens: z.array(z.unknown()),
    accounts: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
