// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { pt } from "@payloadcms/translations/languages/pt";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { Authors } from "./collections/authors";
import { Categories } from "./collections/categories";
import { Media } from "./collections/media";
import { Posts } from "./collections/posts";
import { Users } from "./collections/users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
    "http://localhost:3000",
    "https://cms.curator.com.br",
    "https://curator.com.br",
  ],
  collections: [Users, Media, Authors, Categories, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    push:
      process.env.PAYLOAD_DB_PUSH === "true" ||
      process.env.NODE_ENV === "development",
  }),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { en, pt },
  },
});
