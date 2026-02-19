import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenSelectObjectSchema as RefreshTokenSelectObjectSchema } from "./objects/RefreshTokenSelect.schema";
import { RefreshTokenIncludeObjectSchema as RefreshTokenIncludeObjectSchema } from "./objects/RefreshTokenInclude.schema";
import { RefreshTokenCreateInputObjectSchema as RefreshTokenCreateInputObjectSchema } from "./objects/RefreshTokenCreateInput.schema";
import { RefreshTokenUncheckedCreateInputObjectSchema as RefreshTokenUncheckedCreateInputObjectSchema } from "./objects/RefreshTokenUncheckedCreateInput.schema";

export const RefreshTokenCreateOneSchema: z.ZodType<Prisma.RefreshTokenCreateArgs> =
  z
    .object({
      select: RefreshTokenSelectObjectSchema.optional(),
      include: RefreshTokenIncludeObjectSchema.optional(),
      data: z.union([
        RefreshTokenCreateInputObjectSchema,
        RefreshTokenUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenCreateArgs>;

export const RefreshTokenCreateOneZodSchema = z
  .object({
    select: RefreshTokenSelectObjectSchema.optional(),
    include: RefreshTokenIncludeObjectSchema.optional(),
    data: z.union([
      RefreshTokenCreateInputObjectSchema,
      RefreshTokenUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
