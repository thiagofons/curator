import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      token: z.string().optional(),
    })
    .strict();
export const RefreshTokenWhereUniqueInputObjectSchema: z.ZodType<Prisma.RefreshTokenWhereUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenWhereUniqueInput>;
export const RefreshTokenWhereUniqueInputObjectZodSchema = makeSchema();
