import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenOrderByWithRelationInputObjectSchema as RefreshTokenOrderByWithRelationInputObjectSchema } from "./objects/RefreshTokenOrderByWithRelationInput.schema";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./objects/RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenCountAggregateInputObjectSchema as RefreshTokenCountAggregateInputObjectSchema } from "./objects/RefreshTokenCountAggregateInput.schema";
import { RefreshTokenMinAggregateInputObjectSchema as RefreshTokenMinAggregateInputObjectSchema } from "./objects/RefreshTokenMinAggregateInput.schema";
import { RefreshTokenMaxAggregateInputObjectSchema as RefreshTokenMaxAggregateInputObjectSchema } from "./objects/RefreshTokenMaxAggregateInput.schema";

export const RefreshTokenAggregateSchema: z.ZodType<Prisma.RefreshTokenAggregateArgs> =
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
      _count: z
        .union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema])
        .optional(),
      _min: RefreshTokenMinAggregateInputObjectSchema.optional(),
      _max: RefreshTokenMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenAggregateArgs>;

export const RefreshTokenAggregateZodSchema = z
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
    _count: z
      .union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema])
      .optional(),
    _min: RefreshTokenMinAggregateInputObjectSchema.optional(),
    _max: RefreshTokenMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
