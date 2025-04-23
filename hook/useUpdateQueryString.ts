"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateQueryString() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`?${params.toString()}`);
  };

  return updateQuery;
}
