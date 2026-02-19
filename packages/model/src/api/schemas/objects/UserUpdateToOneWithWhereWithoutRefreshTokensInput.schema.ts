import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UserUpdateWithoutRefreshTokensInputObjectSchema as UserUpdateWithoutRefreshTokensInputObjectSchema } from "./UserUpdateWithoutRefreshTokensInput.schema";
import { UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema as UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedUpdateWithoutRefreshTokensInput.schema";

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput>;
export const UserUpdateToOneWithWhereWithoutRefreshTokensInputObjectZodSchema =
  makeSchema();
