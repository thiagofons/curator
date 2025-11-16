import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0, // 2 retentativas em CI
  workers: process.env.CI ? 1 : undefined, // Roda em série em CI

  // ⬇️ A PARTE MAIS IMPORTANTE ⬇️
  // Inicia o servidor web (apps/web) automaticamente
  webServer: {
    // Comando para iniciar o servidor web (apps/web)
    // Usamos pnpm --filter para rodar o script 'dev' apenas do app 'web'
    command: "pnpm run dev --filter web",

    // A URL que o Playwright deve esperar estar pronta
    url: baseURL,

    // Reutiliza o servidor se já estiver rodando (ótimo para DX local)
    reuseExistingServer: !process.env.CI,
  },

  // URL base para todos os testes (ex: page.goto('/login'))
  use: {
    baseURL: baseURL,
    trace: "on-first-retry",
  },

  // Configuração de projetos (ex: rodar em Chrome e Firefox)
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
