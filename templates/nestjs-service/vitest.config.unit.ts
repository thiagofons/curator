import { sharedConfig } from '@repo/vitest-config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    include: ['src/**/*.spec.ts'],
    exclude: ['src/**/*.it.spec.ts'], // Exclui testes de integração
  },
})