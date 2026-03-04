import { citiesQueryOptions } from "./cities";

import { useQuery } from "@tanstack/react-query";

export function useCities(enabled: boolean = true) {
  const citiesQuery = useQuery(citiesQueryOptions(enabled));

  const { data, isPending, isError, isSuccess, refetch } = citiesQuery;

  return { data, isPending, isError, isSuccess, refetch };
}
