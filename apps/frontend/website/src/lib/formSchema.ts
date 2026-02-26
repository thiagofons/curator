import * as z from "zod";

export const formSchema = z.object({
  email: z.email("E-mail inválido"),
});

export type FormValues = z.infer<typeof formSchema>;
