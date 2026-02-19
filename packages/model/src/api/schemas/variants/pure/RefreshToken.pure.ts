import * as z from "zod";
// prettier-ignore
export const RefreshTokenModelSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    user: z.unknown(),
    userAgent: z.string().nullable(),
    ipAddress: z.string().nullable(),
    revoked: z.boolean(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type RefreshTokenPureType = z.infer<typeof RefreshTokenModelSchema>;
