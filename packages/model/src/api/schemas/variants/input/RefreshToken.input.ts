import * as z from "zod";
// prettier-ignore
export const RefreshTokenInputSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    user: z.unknown(),
    userAgent: z.string().optional().nullable(),
    ipAddress: z.string().optional().nullable(),
    revoked: z.boolean(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type RefreshTokenInputType = z.infer<typeof RefreshTokenInputSchema>;
