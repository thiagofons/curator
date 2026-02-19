import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserCreateWithoutRefreshTokensInputObjectSchema as UserCreateWithoutRefreshTokensInputObjectSchema } from "./UserCreateWithoutRefreshTokensInput.schema";
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema as UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedCreateWithoutRefreshTokensInput.schema";
import { UserCreateOrConnectWithoutRefreshTokensInputObjectSchema as UserCreateOrConnectWithoutRefreshTokensInputObjectSchema } from "./UserCreateOrConnectWithoutRefreshTokensInput.schema";
import { UserUpsertWithoutRefreshTokensInputObjectSchema as UserUpsertWithoutRefreshTokensInputObjectSchema } from "./UserUpsertWithoutRefreshTokensInput.schema";
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";
import { UserUpdateToOneWithWhereWithoutRefreshTokensInputObjectSchema as UserUpdateToOneWithWhereWithoutRefreshTokensInputObjectSchema } from "./UserUpdateToOneWithWhereWithoutRefreshTokensInput.schema";
import { UserUpdateWithoutRefreshTokensInputObjectSchema as UserUpdateWithoutRefreshTokensInputObjectSchema } from "./UserUpdateWithoutRefreshTokensInput.schema";
import { UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema as UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedUpdateWithoutRefreshTokensInput.schema";

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
          z.lazy(
            () => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutRefreshTokensInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutRefreshTokensInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutRefreshTokensInputObjectSchema,
          ),
          z.lazy(() => UserUpdateWithoutRefreshTokensInputObjectSchema),
          z.lazy(
            () => UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutRefreshTokensNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput>;
export const UserUpdateOneRequiredWithoutRefreshTokensNestedInputObjectZodSchema =
  makeSchema();
