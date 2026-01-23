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
  readonly FIREBASE_API_KEY: string;
  readonly FIREBASE_AUTH_DOMAIN: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_STORAGE_BUCKET: string;
  readonly FIREBASE_MESSAGING_SENDER_ID: string;
  readonly FIREBASE_APP_ID: string;
  readonly FIREBASE_MEASUREMENT_ID: string;
  readonly FIREBASE_SERVICE_ACCOUNT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
