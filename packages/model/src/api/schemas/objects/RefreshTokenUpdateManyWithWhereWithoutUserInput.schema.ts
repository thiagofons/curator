import * as z from "zod";
import type { Prisma } from "../../../../../db/src/api/client";
import { RefreshTokenScalarWhereInputObjectSchema as RefreshTokenScalarWhereInputObjectSchema } from "./RefreshTokenScalarWhereInput.schema";
import { RefreshTokenUpdateManyMutationInputObjectSchema as RefreshTokenUpdateManyMutationInputObjectSchema } from "./RefreshTokenUpdateManyMutationInput.schema";
import { RefreshTokenUncheckedUpdateManyWithoutUserInputObjectSchema as RefreshTokenUncheckedUpdateManyWithoutUserInputObjectSchema } from "./RefreshTokenUncheckedUpdateManyWithoutUserInput.schema";

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RefreshTokenScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RefreshTokenUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => RefreshTokenUncheckedUpdateManyWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput>;
export const RefreshTokenUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
