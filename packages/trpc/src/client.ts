import { type AppRouter } from "@api-gateway/@generated/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.TRPC_SERVER_URL || "http://localhost:3300/trpc",
      headers() {
        return {
          // exemplo: auth, cookies, etc.
        };
      },
    }),
  ],
});
