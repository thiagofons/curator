import * as z from "zod";
export const RefreshTokenUpdateResultSchema = z.nullable(
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
);
