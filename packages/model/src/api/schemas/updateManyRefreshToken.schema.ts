import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenUpdateManyMutationInputObjectSchema as RefreshTokenUpdateManyMutationInputObjectSchema } from "./objects/RefreshTokenUpdateManyMutationInput.schema";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";

export const RefreshTokenUpdateManySchema: z.ZodType<Prisma.RefreshTokenUpdateManyArgs> =
  z
    .object({
      data: RefreshTokenUpdateManyMutationInputObjectSchema,
      where: RefreshTokenWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenUpdateManyArgs>;

export const RefreshTokenUpdateManyZodSchema = z
  .object({
    data: RefreshTokenUpdateManyMutationInputObjectSchema,
    where: RefreshTokenWhereInputObjectSchema.optional(),
  })
  .strict();
