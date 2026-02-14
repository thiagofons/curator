import * as z from "zod";
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    email: z.string()
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
