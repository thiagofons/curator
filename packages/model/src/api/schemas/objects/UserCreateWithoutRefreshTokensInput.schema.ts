import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RoleSchema } from "../enums/Role.schema";
import { PlanTypeSchema } from "../enums/PlanType.schema";
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from "./AccountCreateNestedManyWithoutUserInput.schema";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      password: z.string().optional().nullable(),
      role: RoleSchema.optional(),
      plan: PlanTypeSchema.optional(),
      isPro: z.boolean().optional(),
      isActive: z.boolean().optional(),
      lastLoginAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserCreateWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput>;
export const UserCreateWithoutRefreshTokensInputObjectZodSchema = makeSchema();
