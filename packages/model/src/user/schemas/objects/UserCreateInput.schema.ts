import * as z from "zod";
import type { Prisma } from "../../../../../db/src/user/client";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
    })
    .strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
