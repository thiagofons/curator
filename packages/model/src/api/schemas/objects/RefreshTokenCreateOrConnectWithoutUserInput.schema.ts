import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenCreateWithoutUserInputObjectSchema as RefreshTokenCreateWithoutUserInputObjectSchema } from "./RefreshTokenCreateWithoutUserInput.schema";
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from "./RefreshTokenUncheckedCreateWithoutUserInput.schema";

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const RefreshTokenCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutUserInput>;
export const RefreshTokenCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
