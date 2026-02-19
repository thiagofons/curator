import * as z from "zod";

export const RoleSchema = z.enum(["USER", "MODERATOR", "ADMIN"]);

export type Role = z.infer<typeof RoleSchema>;
