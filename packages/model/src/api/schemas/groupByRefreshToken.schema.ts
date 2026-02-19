import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";
import { RefreshTokenOrderByWithAggregationInputObjectSchema as RefreshTokenOrderByWithAggregationInputObjectSchema } from "./objects/RefreshTokenOrderByWithAggregationInput.schema";
import { RefreshTokenScalarWhereWithAggregatesInputObjectSchema as RefreshTokenScalarWhereWithAggregatesInputObjectSchema } from "./objects/RefreshTokenScalarWhereWithAggregatesInput.schema";
import { RefreshTokenScalarFieldEnumSchema } from "./enums/RefreshTokenScalarFieldEnum.schema";
import { RefreshTokenCountAggregateInputObjectSchema as RefreshTokenCountAggregateInputObjectSchema } from "./objects/RefreshTokenCountAggregateInput.schema";
import { RefreshTokenMinAggregateInputObjectSchema as RefreshTokenMinAggregateInputObjectSchema } from "./objects/RefreshTokenMinAggregateInput.schema";
import { RefreshTokenMaxAggregateInputObjectSchema as RefreshTokenMaxAggregateInputObjectSchema } from "./objects/RefreshTokenMaxAggregateInput.schema";

export const RefreshTokenGroupBySchema: z.ZodType<Prisma.RefreshTokenGroupByArgs> =
  z
    .object({
      where: RefreshTokenWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          RefreshTokenOrderByWithAggregationInputObjectSchema,
          RefreshTokenOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having: RefreshTokenScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(RefreshTokenScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema])
        .optional(),
      _min: RefreshTokenMinAggregateInputObjectSchema.optional(),
      _max: RefreshTokenMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenGroupByArgs>;

export const RefreshTokenGroupByZodSchema = z
  .object({
    where: RefreshTokenWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RefreshTokenOrderByWithAggregationInputObjectSchema,
        RefreshTokenOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: RefreshTokenScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RefreshTokenScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema])
      .optional(),
    _min: RefreshTokenMinAggregateInputObjectSchema.optional(),
    _max: RefreshTokenMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
