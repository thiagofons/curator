import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenIncludeObjectSchema as RefreshTokenIncludeObjectSchema } from "./objects/RefreshTokenInclude.schema";
import { RefreshTokenOrderByWithRelationInputObjectSchema as RefreshTokenOrderByWithRelationInputObjectSchema } from "./objects/RefreshTokenOrderByWithRelationInput.schema";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from "./objects/RefreshTokenWhereUniqueInput.schema";
import { RefreshTokenScalarFieldEnumSchema } from "./enums/RefreshTokenScalarFieldEnum.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RefreshTokenFindFirstSelectSchema: z.ZodType<Prisma.RefreshTokenSelect> =
  z
    .object({
      id: z.boolean().optional(),
      token: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.boolean().optional(),
      userAgent: z.boolean().optional(),
      ipAddress: z.boolean().optional(),
      revoked: z.boolean().optional(),
      expiresAt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenSelect>;

export const RefreshTokenFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    ipAddress: z.boolean().optional(),
    revoked: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
  })
  .strict();

export const RefreshTokenFindFirstSchema: z.ZodType<Prisma.RefreshTokenFindFirstArgs> =
  z
    .object({
      select: RefreshTokenFindFirstSelectSchema.optional(),
      include: z.lazy(() => RefreshTokenIncludeObjectSchema.optional()),
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
      distinct: z
        .union([
          RefreshTokenScalarFieldEnumSchema,
          RefreshTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenFindFirstArgs>;

export const RefreshTokenFindFirstZodSchema = z
  .object({
    select: RefreshTokenFindFirstSelectSchema.optional(),
    include: z.lazy(() => RefreshTokenIncludeObjectSchema.optional()),
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
    distinct: z
      .union([
        RefreshTokenScalarFieldEnumSchema,
        RefreshTokenScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
