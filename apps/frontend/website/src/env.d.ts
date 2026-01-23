declare namespace App {
  interface Locals {
    // Vamos criar um helper para facilitar o uso
    isFeatureEnabled: (featureName: string) => boolean;
    // Opcional: Se você quiser passar todas as flags brutas para o front
    allFlags?: any;
  }
}

interface ImportMetaEnv {
  readonly FLAGSMITH_ENV_KEY: string;
  readonly DISCORD_WEBHOOK_URL: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
