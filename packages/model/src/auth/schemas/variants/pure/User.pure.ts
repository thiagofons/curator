import * as z from "zod";
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string()
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
