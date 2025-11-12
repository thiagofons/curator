import { execSync } from 'child_process'
import { config } from 'dotenv'

export default async function setup() {
  console.log('\n[Vitest GlobalSetup] Preparando o banco de dados de integração...')

  config({ path: '.env.test' })

  try {
    execSync('pnpm prisma migrate reset --force')
    console.log('[Vitest GlobalSetup] Banco de dados pronto.\n')
  } catch (error) {
    console.error('[Vitest GlobalSetup] Falha ao preparar o banco:', error)
    process.exit(1)
  }
}