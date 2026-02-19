import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenSelectObjectSchema as RefreshTokenSelectObjectSchema } from "./objects/RefreshTokenSelect.schema";
import { RefreshTokenIncludeObjectSchema as RefreshTokenIncludeObjectSchema } from "./objects/RefreshTokenInclude.schema";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./objects/RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenCreateInputObjectSchema as RefreshTokenCreateInputObjectSchema } from "./objects/RefreshTokenCreateInput.schema";
import { RefreshTokenUncheckedCreateInputObjectSchema as RefreshTokenUncheckedCreateInputObjectSchema } from "./objects/RefreshTokenUncheckedCreateInput.schema";
import { RefreshTokenUpdateInputObjectSchema as RefreshTokenUpdateInputObjectSchema } from "./objects/RefreshTokenUpdateInput.schema";
import { RefreshTokenUncheckedUpdateInputObjectSchema as RefreshTokenUncheckedUpdateInputObjectSchema } from "./objects/RefreshTokenUncheckedUpdateInput.schema";

export const RefreshTokenUpsertOneSchema: z.ZodType<Prisma.RefreshTokenUpsertArgs> =
  z
    .object({
      select: RefreshTokenSelectObjectSchema.optional(),
      include: RefreshTokenIncludeObjectSchema.optional(),
      where: RefreshTokenWhereUniqueInputObjectSchema,
      create: z.union([
        RefreshTokenCreateInputObjectSchema,
        RefreshTokenUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        RefreshTokenUpdateInputObjectSchema,
        RefreshTokenUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenUpsertArgs>;

export const RefreshTokenUpsertOneZodSchema = z
  .object({
    select: RefreshTokenSelectObjectSchema.optional(),
    include: RefreshTokenIncludeObjectSchema.optional(),
    where: RefreshTokenWhereUniqueInputObjectSchema,
    create: z.union([
      RefreshTokenCreateInputObjectSchema,
      RefreshTokenUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RefreshTokenUpdateInputObjectSchema,
      RefreshTokenUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
