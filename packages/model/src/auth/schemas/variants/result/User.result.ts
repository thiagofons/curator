import * as z from "zod";
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    email: z.string()
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
