import * as z from "zod";
export const UserCreateResultSchema = z.object({
  id: z.string(),
  email: z.string(),
});
