import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RoleSchema } from "../enums/Role.schema";
import { PlanTypeSchema } from "../enums/PlanType.schema";
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./AccountUncheckedCreateNestedManyWithoutUserInput.schema";

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
        .lazy(
          () => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
export const UserUncheckedCreateWithoutRefreshTokensInputObjectZodSchema =
  makeSchema();
