// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Authors } from './collections/Authors'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Allow requests from website dev and production domains
  cors: [
    'http://localhost:4001',
    'http://127.0.0.1:4001',
    'http://localhost:4003',
    'http://127.0.0.1:4003',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://cms.curator.com.br',
    'https://curator.com.br',
    'https://www.curator.com.br',
  ],
  csrf: [
    'http://localhost:4001',
    'http://127.0.0.1:4001',
    'http://localhost:4003',
    'http://127.0.0.1:4003',
    'https://cms.curator.com.br',
    'https://curator.com.br',
    'https://www.curator.com.br',
  ],
  collections: [Users, Media, Authors, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
