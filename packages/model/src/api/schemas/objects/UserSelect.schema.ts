import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenFindManySchema as RefreshTokenFindManySchema } from "../findManyRefreshToken.schema";
import { AccountFindManySchema as AccountFindManySchema } from "../findManyAccount.schema";
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from "./UserCountOutputTypeArgs.schema";

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      email: z.boolean().optional(),
      password: z.boolean().optional(),
      role: z.boolean().optional(),
      plan: z.boolean().optional(),
      isPro: z.boolean().optional(),
      isActive: z.boolean().optional(),
      lastLoginAt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      refreshTokens: z
        .union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)])
        .optional(),
      accounts: z
        .union([z.boolean(), z.lazy(() => AccountFindManySchema)])
        .optional(),
      _count: z
        .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
