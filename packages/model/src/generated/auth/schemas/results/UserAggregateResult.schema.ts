import * as z from "zod";
export const UserAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      email: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      email: z.string().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      email: z.string().nullable(),
    })
    .nullable()
    .optional(),
});
