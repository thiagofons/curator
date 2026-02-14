import * as z from "zod";
import type { Prisma } from "../../../../../../db/src/auth/client";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
    })
    .strict();
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyInput>;
export const UserCreateManyInputObjectZodSchema = makeSchema();
