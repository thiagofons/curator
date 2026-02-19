import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenCreateManyUserInputObjectSchema as RefreshTokenCreateManyUserInputObjectSchema } from "./RefreshTokenCreateManyUserInput.schema";

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RefreshTokenCreateManyUserInputObjectSchema),
        z.lazy(() => RefreshTokenCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RefreshTokenCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateManyUserInputEnvelope>;
export const RefreshTokenCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
