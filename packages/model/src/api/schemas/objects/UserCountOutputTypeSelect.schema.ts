import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserCountOutputTypeCountRefreshTokensArgsObjectSchema as UserCountOutputTypeCountRefreshTokensArgsObjectSchema } from "./UserCountOutputTypeCountRefreshTokensArgs.schema";
import { UserCountOutputTypeCountAccountsArgsObjectSchema as UserCountOutputTypeCountAccountsArgsObjectSchema } from "./UserCountOutputTypeCountAccountsArgs.schema";

const makeSchema = () =>
  z
    .object({
      refreshTokens: z
        .union([
          z.boolean(),
          z.lazy(() => UserCountOutputTypeCountRefreshTokensArgsObjectSchema),
        ])
        .optional(),
      accounts: z
        .union([
          z.boolean(),
          z.lazy(() => UserCountOutputTypeCountAccountsArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
