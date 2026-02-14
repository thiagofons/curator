import * as z from "zod";
import type { Prisma } from "../../../../../db/src/user/client";

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      email: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const UserCountAggregateInputObjectSchema: z.ZodType<Prisma.UserCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountAggregateInputType>;
export const UserCountAggregateInputObjectZodSchema = makeSchema();
