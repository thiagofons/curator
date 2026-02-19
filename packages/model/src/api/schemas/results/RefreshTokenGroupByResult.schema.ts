import * as z from "zod";
export const RefreshTokenGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    userAgent: z.string(),
    ipAddress: z.string(),
    revoked: z.boolean(),
    expiresAt: z.date(),
    createdAt: z.date(),
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
  }),
);
