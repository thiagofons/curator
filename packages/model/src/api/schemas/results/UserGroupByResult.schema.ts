import * as z from "zod";
export const UserGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    isPro: z.boolean(),
    isActive: z.boolean(),
    lastLoginAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        name: z.number(),
        email: z.number(),
        password: z.number(),
        role: z.number(),
        plan: z.number(),
        isPro: z.number(),
        isActive: z.number(),
        lastLoginAt: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
        refreshTokens: z.number(),
        accounts: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        email: z.string().nullable(),
        password: z.string().nullable(),
        lastLoginAt: z.date().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        email: z.string().nullable(),
        password: z.string().nullable(),
        lastLoginAt: z.date().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
