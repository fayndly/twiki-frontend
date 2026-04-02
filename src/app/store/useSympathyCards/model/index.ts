import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSympathyCards } from "../api";

import type { ICartSympathy } from "../types";
import type { AxiosErrorDto } from "@/app/api";

const sympathyCardsQueryOptions = () =>
  queryOptions<ICartSympathy[], AxiosErrorDto>({
    queryKey: ["sympathyCards"],
    queryFn: getSympathyCards,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

export function useSympathyCards() {
  const sympathyCardsQuery = useQuery(sympathyCardsQueryOptions());

  const { data, isPending, isError, isSuccess, refetch, error } = sympathyCardsQuery;

  return { data, isPending, isError, isSuccess, refetch, error };
}
