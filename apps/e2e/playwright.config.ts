import { defineConfig, devices } from "@playwright/test";

const API_GATEWAY_PORT = 3300;
const baseURL = `http://localhost:${API_GATEWAY_PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false, // Run tests in sequence for backend tests
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Use single worker for backend tests

  // Timeout for each test (RabbitMQ communication might take a few seconds)
  timeout: 30000,

  // No webServer needed - services should be started via docker-compose
  // before running tests. Run: pnpm compose:core

  // URL base for all tests
  use: {
    baseURL: baseURL,
    trace: "on-first-retry",
  },

  // Configuration for projects
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
