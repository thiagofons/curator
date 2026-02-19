import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenFindManySchema as RefreshTokenFindManySchema } from "../findManyRefreshToken.schema";
import { AccountFindManySchema as AccountFindManySchema } from "../findManyAccount.schema";
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from "./UserCountOutputTypeArgs.schema";

const makeSchema = () =>
  z
    .object({
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
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
