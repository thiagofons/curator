import { flagsmith } from "@/lib/flagsmith";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    // 1. Buscamos as flags uma única vez por requisição
    const flags = await flagsmith.getEnvironmentFlags();

    // 2. Injetamos a função helper dentro de locals
    context.locals.isFeatureEnabled = (featureName: string) => {
      return flags.isFeatureEnabled(featureName);
    };

    // (Opcional) Se precisar das flags no client-side (React/Vue),
    // você poderia serializá-las aqui para passar via window global,
    // mas vamos focar no server-side rendering do Astro por enquanto.
  } catch (error) {
    console.error("Erro ao carregar Flagsmith:", error);
    // Fallback: retorna sempre falso se a API falhar
    context.locals.isFeatureEnabled = () => false;
  }

  // Continua para a renderização da página
  return next();
});
