import { config } from "@keystone-6/core";

import { lists } from "./schema";

import { withAuth, session } from "./auth";
import { DatabaseProvider } from "@keystone-6/core/types";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://postgres:password@127.0.0.1:5432/capital";
const databaseProvider = process.env.DATABASE_PROVIDER ?? "postgresql";

export default withAuth(
  config({
    ui: {
      basePath: "/cms"
    },
    db: {
      provider: databaseProvider as DatabaseProvider,
      url: databaseUrl,
    },
    server: {
      cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      },
    },
    storage: {
      localImages: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
    lists,
    session,
  })
);
