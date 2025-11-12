import sharedConfig from "@repo/ui-web/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  // A propriedade 'presets' herda toda a configuração (theme, plugins, etc.)
  presets: [sharedConfig],

  // A propriedade 'content' é específica para esta aplicação.
  // Ela diz ao Tailwind quais arquivos devem ser escaneados em busca de classes.
  content: ["./.storybook/**/*.{js,ts,jsx,tsx}", "../../../packages/ui-web/src/**/*.{ts,tsx}"],
};

export default config;
