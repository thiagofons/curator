import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "../../../apps/backend/api-gateway";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.TRPC_SERVER_URL || "http://localhost:3300/trpc",
      headers() {
        return {};
      },
    }),
  ],
});
