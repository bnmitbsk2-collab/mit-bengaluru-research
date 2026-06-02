/**
 * Payload config for CLI scripts (seed, migrate) — no Lexical editor import.
 * Lexical uses top-level await which breaks Payload CLI on Node 22 + tsx.
 * Next.js admin uses payload.config.ts with full Lexical support.
 */
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { collections } from "./src/payload/collections/index.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "— MIT Bengaluru Research CMS",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals: [
    {
      slug: "site-settings",
      label: "Site Settings",
      fields: [
        { name: "institutionName", type: "text", required: true },
        { name: "contactEmail", type: "email", required: true },
        { name: "contactPhone", type: "text" },
        { name: "address", type: "textarea" },
        { name: "metrics", type: "json" },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "mit-bengaluru-dev-secret-change-me",
  serverURL: process.env.CMS_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  bin: [
    {
      key: "seed",
      scriptPath: path.resolve(dirname, "scripts/seed-cms.mjs"),
    },
  ],
});
