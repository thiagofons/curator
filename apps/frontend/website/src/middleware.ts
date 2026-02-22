import { flagsmith } from "@/lib/flagsmith";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const flags = await flagsmith.getEnvironmentFlags();

    context.locals.isFeatureEnabled = (featureName: string) => {
      return flags.isFeatureEnabled(featureName);
    };
  } catch (error) {
    console.error("Erro ao carregar Flagsmith:", error);
    context.locals.isFeatureEnabled = () => false;
  }

  return next();
});
