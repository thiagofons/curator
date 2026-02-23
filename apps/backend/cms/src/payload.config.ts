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

type Environment = "development" | "staging" | "production";

const addresses: Record<Environment, string> = {
  development: "http://localhost:3000",
  staging: "cms.curator.local",
  production: "cms.curator.com.br",
};

const address = addresses[process.env.NODE_ENV as Environment];

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [address],
  csrf: [address],
  collections: [Users, Media, Authors, Categories, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.CMS_DATABASE_URL || "",
    },
    push: true,
  }),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { en, pt },
  },
});
