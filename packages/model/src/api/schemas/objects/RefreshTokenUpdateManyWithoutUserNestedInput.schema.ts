import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenCreateWithoutUserInputObjectSchema as RefreshTokenCreateWithoutUserInputObjectSchema } from "./RefreshTokenCreateWithoutUserInput.schema";
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from "./RefreshTokenUncheckedCreateWithoutUserInput.schema";
import { RefreshTokenCreateOrConnectWithoutUserInputObjectSchema as RefreshTokenCreateOrConnectWithoutUserInputObjectSchema } from "./RefreshTokenCreateOrConnectWithoutUserInput.schema";
import { RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema as RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema } from "./RefreshTokenUpsertWithWhereUniqueWithoutUserInput.schema";
import { RefreshTokenCreateManyUserInputEnvelopeObjectSchema as RefreshTokenCreateManyUserInputEnvelopeObjectSchema } from "./RefreshTokenCreateManyUserInputEnvelope.schema";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema as RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema } from "./RefreshTokenUpdateWithWhereUniqueWithoutUserInput.schema";
import { RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema as RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema } from "./RefreshTokenUpdateManyWithWhereWithoutUserInput.schema";
import { RefreshTokenScalarWhereInputObjectSchema as RefreshTokenScalarWhereInputObjectSchema } from "./RefreshTokenScalarWhereInput.schema";

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
      upsert: z
        .union([
          z.lazy(
            () => RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RefreshTokenCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
          z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RefreshTokenScalarWhereInputObjectSchema),
          z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.RefreshTokenUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenUpdateManyWithoutUserNestedInput>;
export const RefreshTokenUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
