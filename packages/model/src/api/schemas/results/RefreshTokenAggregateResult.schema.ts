import * as z from "zod";
export const RefreshTokenAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      token: z.number(),
      userId: z.number(),
      user: z.number(),
      userAgent: z.number(),
      ipAddress: z.number(),
      revoked: z.number(),
      expiresAt: z.number(),
      createdAt: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      token: z.string().nullable(),
      userId: z.string().nullable(),
      userAgent: z.string().nullable(),
      ipAddress: z.string().nullable(),
      expiresAt: z.date().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      token: z.string().nullable(),
      userId: z.string().nullable(),
      userAgent: z.string().nullable(),
      ipAddress: z.string().nullable(),
      expiresAt: z.date().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
