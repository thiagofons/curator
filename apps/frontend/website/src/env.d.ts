declare namespace App {
  interface Locals {
    isFeatureEnabled: (featureName: string) => boolean;
    allFlags?: any;
  }
}

interface ImportMetaEnv {
  readonly FLAGS_ENVIRONMENT_KEY: string;
  readonly FLAGS_API_URL: string;
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
