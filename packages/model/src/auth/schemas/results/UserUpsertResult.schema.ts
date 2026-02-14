import * as z from "zod";
export const UserUpsertResultSchema = z.object({
  id: z.string(),
  email: z.string(),
});
