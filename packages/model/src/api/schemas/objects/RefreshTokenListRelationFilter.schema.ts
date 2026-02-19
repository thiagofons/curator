import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./RefreshTokenWhereInput.schema";

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
      some: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
      none: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
    })
    .strict();
export const RefreshTokenListRelationFilterObjectSchema: z.ZodType<Prisma.RefreshTokenListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenListRelationFilter>;
export const RefreshTokenListRelationFilterObjectZodSchema = makeSchema();
