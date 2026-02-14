import * as z from "zod";
export const UserFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
  }),
);
