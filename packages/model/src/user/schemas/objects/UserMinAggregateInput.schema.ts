import * as z from "zod";
import type { Prisma } from "../../../../../db/src/user/client";

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      email: z.literal(true).optional(),
    })
    .strict();
export const UserMinAggregateInputObjectSchema: z.ZodType<Prisma.UserMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserMinAggregateInputType>;
export const UserMinAggregateInputObjectZodSchema = makeSchema();
