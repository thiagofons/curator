import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { UserArgsObjectSchema as UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RefreshTokenIncludeObjectSchema: z.ZodType<Prisma.RefreshTokenInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenInclude>;
export const RefreshTokenIncludeObjectZodSchema = makeSchema();
