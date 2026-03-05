import { filtersQueryOptions, filtersMutationQueryOptions } from "./filters";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useFilters(enabled: boolean = true) {
  const filtersQuery = useQuery(filtersQueryOptions(enabled));
  const filtersMutations = useMutation(filtersMutationQueryOptions);

  const { data, isPending, isError, isSuccess, refetch, isFetching } =
    filtersQuery;

  return {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    filtersMutations,
    isFetching,
  };
}
