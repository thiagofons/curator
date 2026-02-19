import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenCreateWithoutUserInputObjectSchema as RefreshTokenCreateWithoutUserInputObjectSchema } from "./RefreshTokenCreateWithoutUserInput.schema";
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from "./RefreshTokenUncheckedCreateWithoutUserInput.schema";
import { RefreshTokenCreateOrConnectWithoutUserInputObjectSchema as RefreshTokenCreateOrConnectWithoutUserInputObjectSchema } from "./RefreshTokenCreateOrConnectWithoutUserInput.schema";
import { RefreshTokenCreateManyUserInputEnvelopeObjectSchema as RefreshTokenCreateManyUserInputEnvelopeObjectSchema } from "./RefreshTokenCreateManyUserInputEnvelope.schema";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./RefreshTokenWhereUniqueInput.schema";

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema),
          z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => RefreshTokenCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RefreshTokenCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
export const RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
