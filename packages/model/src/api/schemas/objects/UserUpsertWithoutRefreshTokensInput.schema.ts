import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserUpdateWithoutRefreshTokensInputObjectSchema as UserUpdateWithoutRefreshTokensInputObjectSchema } from "./UserUpdateWithoutRefreshTokensInput.schema";
import { UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema as UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedUpdateWithoutRefreshTokensInput.schema";
import { UserCreateWithoutRefreshTokensInputObjectSchema as UserCreateWithoutRefreshTokensInputObjectSchema } from "./UserCreateWithoutRefreshTokensInput.schema";
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema as UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedCreateWithoutRefreshTokensInput.schema";
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from "./UserWhereInput.schema";

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRefreshTokensInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRefreshTokensInput>;
export const UserUpsertWithoutRefreshTokensInputObjectZodSchema = makeSchema();
