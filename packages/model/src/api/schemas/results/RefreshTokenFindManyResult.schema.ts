import * as z from "zod";
export const RefreshTokenFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      token: z.string(),
      userId: z.string(),
      user: z.unknown(),
      userAgent: z.string().optional(),
      ipAddress: z.string().optional(),
      revoked: z.boolean(),
      expiresAt: z.date(),
      createdAt: z.date(),
    }),
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
