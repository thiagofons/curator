import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      token: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      userAgent: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      ipAddress: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      revoked: SortOrderSchema.optional(),
      expiresAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const RefreshTokenOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput>;
export const RefreshTokenOrderByWithRelationInputObjectZodSchema = makeSchema();
