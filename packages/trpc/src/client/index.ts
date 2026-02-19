import { type AppRouter } from "@backend/api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

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
