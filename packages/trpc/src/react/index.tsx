import type { AppRouter } from "@backend/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact, type CreateTRPCReact } from "@trpc/react-query";
import React, { useMemo } from "react";

// Exportamos o objeto de hooks para as apps usarem
export const trpc: CreateTRPCReact<AppRouter, unknown> =
  createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos de cache por padrão
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url:
              process.env.NEXT_PUBLIC_API_URL ||
              process.env.EXPO_PUBLIC_API_URL ||
              "http://localhost:3300/trpc",
            async headers() {
              return {};
            },
          }),
        ],
      }),
    [],
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
