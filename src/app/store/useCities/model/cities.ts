import type { StoreItemCities } from "../types";
import { getCities } from "../api";

import { queryOptions } from "@tanstack/react-query";

export const citiesQueryOptions = (enabled: boolean) =>
  queryOptions<StoreItemCities[]>({
    queryKey: ["cities"],
    queryFn: getCities,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
