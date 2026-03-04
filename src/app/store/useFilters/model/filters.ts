import { getFilters, updateFilters } from "../api";

import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "../..";

export const filtersQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: ["filters"],
    queryFn: getFilters,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
    select: (dto) => ({
      ageMin: dto.age.min,
      ageMax: dto.age.max,
      sex: dto.sex,
      city: dto.cityId,
    }),
  });

export const filtersMutationQueryOptions = {
  mutationFn: updateFilters,
  onSuccess: async (data: any) => {
    queryClient.setQueryData(["filters"], data);
  },
};
