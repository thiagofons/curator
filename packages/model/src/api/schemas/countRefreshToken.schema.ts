import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenOrderByWithRelationInputObjectSchema as RefreshTokenOrderByWithRelationInputObjectSchema } from "./objects/RefreshTokenOrderByWithRelationInput.schema";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./objects/RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenCountAggregateInputObjectSchema as RefreshTokenCountAggregateInputObjectSchema } from "./objects/RefreshTokenCountAggregateInput.schema";

export const RefreshTokenCountSchema: z.ZodType<Prisma.RefreshTokenCountArgs> =
  z
    .object({
      orderBy: z
        .union([
          RefreshTokenOrderByWithRelationInputObjectSchema,
          RefreshTokenOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RefreshTokenWhereInputObjectSchema.optional(),
      cursor: RefreshTokenWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      select: z
        .union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenCountArgs>;

export const RefreshTokenCountZodSchema = z
  .object({
    orderBy: z
      .union([
        RefreshTokenOrderByWithRelationInputObjectSchema,
        RefreshTokenOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RefreshTokenWhereInputObjectSchema.optional(),
    cursor: RefreshTokenWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
