import { formSchema, sendForm, type FormValues } from "@/lib/sendForm";
import { ActionError, defineAction } from "astro:actions";

export const server = {
  createLead: defineAction({
    input: formSchema,
    handler: async (input: FormValues) => {
      try {
        await sendForm(input);

        console.log("✅ Lead salvo/atualizado no Firestore com sucesso.");
      } catch (error) {
        console.error("🚨 Erro Crítico ao salvar no Firestore:", error);

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Falha ao salvar seus dados. Por favor, tente novamente.",
        });
      }

      return { success: true, message: "Cadastro realizado com sucesso!" };
    },
  }),
};
