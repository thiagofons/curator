import { DISCORD_WEBHOOK_URL } from "astro:env/client";
import axios from "axios";
import z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  theme: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export async function sendForm(data: FormValues): Promise<void> {
  // 1. Fail-fast: Segurança primeiro
  if (!DISCORD_WEBHOOK_URL) {
    console.error(
      "❌ Configuração ausente: DISCORD_WEBHOOK_URL não encontrada.",
    );
    throw new Error("Erro interno de configuração.");
  }

  // 2. Construção do Payload (Visual "Curator Premium")
  const payload = {
    username: "Lead Bot",
    embeds: [
      {
        title: "🚀 Novo Lead Capturado!",
        description: "Um usuário demonstrou interesse na Landing Page.",
        color: "2003199",
        fields: [
          {
            name: "👤 Nome",
            value: data.name,
            inline: true,
          },
          {
            name: "📧 E-mail",
            value: data.email,
            inline: true,
          },
          {
            name: "💡 Temas de Interesse",
            value: `${data.theme ? `${data.theme}` : "Não especificado"}`,
            inline: false,
          },
        ],
        footer: {
          text: "Curator • Landing Page",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, payload);
  } catch {
    throw new Error("Falha ao registrar interesse. Tente novamente.");
  }
}
