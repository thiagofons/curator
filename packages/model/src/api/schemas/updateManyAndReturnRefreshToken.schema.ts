import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenSelectObjectSchema as RefreshTokenSelectObjectSchema } from "./objects/RefreshTokenSelect.schema";
import { RefreshTokenUpdateManyMutationInputObjectSchema as RefreshTokenUpdateManyMutationInputObjectSchema } from "./objects/RefreshTokenUpdateManyMutationInput.schema";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";

export const RefreshTokenUpdateManyAndReturnSchema: z.ZodType<Prisma.RefreshTokenUpdateManyAndReturnArgs> =
  z
    .object({
      select: RefreshTokenSelectObjectSchema.optional(),
      data: RefreshTokenUpdateManyMutationInputObjectSchema,
      where: RefreshTokenWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenUpdateManyAndReturnArgs>;

export const RefreshTokenUpdateManyAndReturnZodSchema = z
  .object({
    select: RefreshTokenSelectObjectSchema.optional(),
    data: RefreshTokenUpdateManyMutationInputObjectSchema,
    where: RefreshTokenWhereInputObjectSchema.optional(),
  })
  .strict();
