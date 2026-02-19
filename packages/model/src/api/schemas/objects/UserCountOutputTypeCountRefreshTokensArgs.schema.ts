import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./RefreshTokenWhereInput.schema";

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserCountOutputTypeCountRefreshTokensArgsObjectSchema =
  makeSchema();
export const UserCountOutputTypeCountRefreshTokensArgsObjectZodSchema =
  makeSchema();
