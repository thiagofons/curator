import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenUpdateWithoutUserInputObjectSchema as RefreshTokenUpdateWithoutUserInputObjectSchema } from "./RefreshTokenUpdateWithoutUserInput.schema";
import { RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema as RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema } from "./RefreshTokenUncheckedUpdateWithoutUserInput.schema";
import { RefreshTokenCreateWithoutUserInputObjectSchema as RefreshTokenCreateWithoutUserInputObjectSchema } from "./RefreshTokenCreateWithoutUserInput.schema";
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from "./RefreshTokenUncheckedCreateWithoutUserInput.schema";

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RefreshTokenUpdateWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput>;
export const RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
