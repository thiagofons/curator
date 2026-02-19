import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenSelectObjectSchema as RefreshTokenSelectObjectSchema } from "./RefreshTokenSelect.schema";
import { RefreshTokenIncludeObjectSchema as RefreshTokenIncludeObjectSchema } from "./RefreshTokenInclude.schema";

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RefreshTokenSelectObjectSchema).optional(),
      include: z.lazy(() => RefreshTokenIncludeObjectSchema).optional(),
    })
    .strict();
export const RefreshTokenArgsObjectSchema = makeSchema();
export const RefreshTokenArgsObjectZodSchema = makeSchema();
