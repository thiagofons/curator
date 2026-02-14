import * as z from "zod";
export const UserDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    email: z.string(),
  }),
);
