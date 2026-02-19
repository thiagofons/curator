import type { Prisma } from "../../../../db/src/api/client";
import * as z from "zod";
import { RefreshTokenWhereInputObjectSchema as RefreshTokenWhereInputObjectSchema } from "./objects/RefreshTokenWhereInput.schema";

export const RefreshTokenDeleteManySchema: z.ZodType<Prisma.RefreshTokenDeleteManyArgs> =
  z
    .object({ where: RefreshTokenWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.RefreshTokenDeleteManyArgs>;

export const RefreshTokenDeleteManyZodSchema = z
  .object({ where: RefreshTokenWhereInputObjectSchema.optional() })
  .strict();
