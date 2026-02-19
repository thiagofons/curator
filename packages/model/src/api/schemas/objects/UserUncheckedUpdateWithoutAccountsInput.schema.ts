import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { EnumRoleFieldUpdateOperationsInputObjectSchema as EnumRoleFieldUpdateOperationsInputObjectSchema } from "./EnumRoleFieldUpdateOperationsInput.schema";
import { PlanTypeSchema } from "../enums/PlanType.schema";
import { EnumPlanTypeFieldUpdateOperationsInputObjectSchema as EnumPlanTypeFieldUpdateOperationsInputObjectSchema } from "./EnumPlanTypeFieldUpdateOperationsInput.schema";
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema as RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./RefreshTokenUncheckedUpdateManyWithoutUserNestedInput.schema";

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      role: z
        .union([
          RoleSchema,
          z.lazy(() => EnumRoleFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      plan: z
        .union([
          PlanTypeSchema,
          z.lazy(() => EnumPlanTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isPro: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      lastLoginAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      refreshTokens: z
        .lazy(
          () =>
            RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput>;
export const UserUncheckedUpdateWithoutAccountsInputObjectZodSchema =
  makeSchema();
