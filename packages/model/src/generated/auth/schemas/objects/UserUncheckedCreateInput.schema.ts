import * as z from "zod";
import type { Prisma } from "../../../../../../db/src/auth/client";

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
    })
    .strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
