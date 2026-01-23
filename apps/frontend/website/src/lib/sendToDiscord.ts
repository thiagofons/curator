import type { FormValues } from "./formSchema";

export async function sendToDiscord(data: FormValues): Promise<void> {
  const webhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "⚠️ DISCORD_WEBHOOK_URL não configurada. Pulando notificação.",
    );
    return;
  }

  const embed = {
    title: "🎉 Novo Lead na Lista de Espera!",
    color: 0x0060f7,
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
        name: "🎯 Tema de Interesse",
        value: data.theme || "Não informado",
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: "Curator - Lista de Espera",
    },
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error("❌ Erro ao enviar para Discord:", response.statusText);
    } else {
      console.log("✅ Notificação enviada para o Discord.");
    }
  } catch (error) {
    console.error("❌ Erro ao enviar para Discord:", error);
  }
}
