"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import type { ProviderProps } from "@/types/provider";
import { trpc } from "@/utils/trpc/client";

export const TrpcProvider = ({ children }: ProviderProps) => {
  const [reactQueryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          async headers() {
            return {};
          },
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={reactQueryClient}>
      <QueryClientProvider client={reactQueryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
