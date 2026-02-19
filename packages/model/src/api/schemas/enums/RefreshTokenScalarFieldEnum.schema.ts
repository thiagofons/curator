import * as z from "zod";

export const RefreshTokenScalarFieldEnumSchema = z.enum([
  "id",
  "token",
  "userId",
  "userAgent",
  "ipAddress",
  "revoked",
  "expiresAt",
  "createdAt",
]);

export type RefreshTokenScalarFieldEnum = z.infer<
  typeof RefreshTokenScalarFieldEnumSchema
>;
