import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { EnumRoleFilterObjectSchema as EnumRoleFilterObjectSchema } from "./EnumRoleFilter.schema";
import { RoleSchema } from "../enums/Role.schema";
import { EnumPlanTypeFilterObjectSchema as EnumPlanTypeFilterObjectSchema } from "./EnumPlanTypeFilter.schema";
import { PlanTypeSchema } from "../enums/PlanType.schema";
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { RefreshTokenListRelationFilterObjectSchema as RefreshTokenListRelationFilterObjectSchema } from "./RefreshTokenListRelationFilter.schema";
import { AccountListRelationFilterObjectSchema as AccountListRelationFilterObjectSchema } from "./AccountListRelationFilter.schema";

const userwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    email: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    password: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    role: z
      .union([z.lazy(() => EnumRoleFilterObjectSchema), RoleSchema])
      .optional(),
    plan: z
      .union([z.lazy(() => EnumPlanTypeFilterObjectSchema), PlanTypeSchema])
      .optional(),
    isPro: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    isActive: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    lastLoginAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    refreshTokens: z
      .lazy(() => RefreshTokenListRelationFilterObjectSchema)
      .optional(),
    accounts: z.lazy(() => AccountListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> =
  userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;
