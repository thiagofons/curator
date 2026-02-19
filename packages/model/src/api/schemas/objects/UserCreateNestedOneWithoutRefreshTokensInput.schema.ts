import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserCreateWithoutRefreshTokensInputObjectSchema as UserCreateWithoutRefreshTokensInputObjectSchema } from "./UserCreateWithoutRefreshTokensInput.schema";
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema as UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedCreateWithoutRefreshTokensInput.schema";
import { UserCreateOrConnectWithoutRefreshTokensInputObjectSchema as UserCreateOrConnectWithoutRefreshTokensInputObjectSchema } from "./UserCreateOrConnectWithoutRefreshTokensInput.schema";
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

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
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRefreshTokensInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRefreshTokensInput>;
export const UserCreateNestedOneWithoutRefreshTokensInputObjectZodSchema =
  makeSchema();
