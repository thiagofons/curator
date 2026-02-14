import * as z from "zod";
import type { Prisma } from "../../../../../db/src/user/client";

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      email: z.boolean().optional(),
    })
    .strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
