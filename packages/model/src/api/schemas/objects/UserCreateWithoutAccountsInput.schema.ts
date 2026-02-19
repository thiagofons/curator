import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RoleSchema } from "../enums/Role.schema";
import { PlanTypeSchema } from "../enums/PlanType.schema";
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from "./RefreshTokenCreateNestedManyWithoutUserInput.schema";

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
      refreshTokens: z
        .lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutAccountsInput>;
export const UserCreateWithoutAccountsInputObjectZodSchema = makeSchema();
