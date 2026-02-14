import * as z from "zod";

export const UserScalarFieldEnumSchema = z.enum(["id", "email"]);

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;
