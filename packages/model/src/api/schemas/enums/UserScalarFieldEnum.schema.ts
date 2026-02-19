import * as z from "zod";

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "password",
  "role",
  "plan",
  "isPro",
  "isActive",
  "lastLoginAt",
  "createdAt",
  "updatedAt",
]);

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;
