'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { api } from '@/trpc/react'; // or '@/utils/api' if your trpc location differs

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const trpcUtils = api.useUtils();

  return (
    <api.Provider queryClient={queryClient} client={trpcUtils.client}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  );
};
