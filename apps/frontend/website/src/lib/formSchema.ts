import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  theme: z.string().optional().default(""),
});

export type FormValues = z.infer<typeof formSchema>;
