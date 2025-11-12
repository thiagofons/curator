import { sharedConfig } from '@repo/vitest-config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  ...sharedConfig,
  test: {
    include: ['src/**/*.it.spec.ts'], 
    testTimeout: 30000,
    
    globalSetup: ['./src/test/global-setup.ts'],
    setupFiles: ['./src/test/setup-integration.ts'],
  },
})