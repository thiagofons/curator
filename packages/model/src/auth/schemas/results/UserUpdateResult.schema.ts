import * as z from "zod";
export const UserUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
  }),
);
