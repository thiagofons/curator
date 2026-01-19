declare namespace App {
  interface Locals {
    // Vamos criar um helper para facilitar o uso
    isFeatureEnabled: (featureName: string) => boolean;
    // Opcional: Se você quiser passar todas as flags brutas para o front
    allFlags?: any;
  }
}
