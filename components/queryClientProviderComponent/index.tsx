"use client";

import { queryClient } from "@/api";
import { QueryClientProvider } from "@tanstack/react-query";

const QueryClientProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderComponent;
