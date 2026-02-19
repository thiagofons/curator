import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenSelectObjectSchema as RefreshTokenSelectObjectSchema } from "./objects/RefreshTokenSelect.schema";
import { RefreshTokenCreateManyInputObjectSchema as RefreshTokenCreateManyInputObjectSchema } from "./objects/RefreshTokenCreateManyInput.schema";

export const RefreshTokenCreateManyAndReturnSchema: z.ZodType<Prisma.RefreshTokenCreateManyAndReturnArgs> =
  z
    .object({
      select: RefreshTokenSelectObjectSchema.optional(),
      data: z.union([
        RefreshTokenCreateManyInputObjectSchema,
        z.array(RefreshTokenCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenCreateManyAndReturnArgs>;

export const RefreshTokenCreateManyAndReturnZodSchema = z
  .object({
    select: RefreshTokenSelectObjectSchema.optional(),
    data: z.union([
      RefreshTokenCreateManyInputObjectSchema,
      z.array(RefreshTokenCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
