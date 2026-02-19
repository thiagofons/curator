import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserCreateNestedOneWithoutRefreshTokensInputObjectSchema as UserCreateNestedOneWithoutRefreshTokensInputObjectSchema } from "./UserCreateNestedOneWithoutRefreshTokensInput.schema";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      token: z.string(),
      userAgent: z.string().optional().nullable(),
      ipAddress: z.string().optional().nullable(),
      revoked: z.boolean().optional(),
      expiresAt: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutRefreshTokensInputObjectSchema,
      ),
    })
    .strict();
export const RefreshTokenCreateInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateInput>;
export const RefreshTokenCreateInputObjectZodSchema = makeSchema();
