import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";
import { UserCreateWithoutRefreshTokensInputObjectSchema as UserCreateWithoutRefreshTokensInputObjectSchema } from "./UserCreateWithoutRefreshTokensInput.schema";
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema as UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from "./UserUncheckedCreateWithoutRefreshTokensInput.schema";

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRefreshTokensInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutRefreshTokensInput>;
export const UserCreateOrConnectWithoutRefreshTokensInputObjectZodSchema =
  makeSchema();
