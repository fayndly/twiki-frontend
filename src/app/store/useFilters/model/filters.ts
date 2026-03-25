import { getFilters, updateFilters } from "../api";

import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "../..";
import type { PropsLikesCardsMutationOptions } from "../types";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";

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

export const filtersMutationQueryOptions: PropsLikesCardsMutationOptions = {
  mutationFn: updateFilters,
  onSuccess: async (data: any) => {
    queryClient.setQueryData(["filters"], data);
  },
  onError: (err, _vars, _onMutateResult, _context) => {
    const addSnackbar = getAddSnackbar();

    let header = `${err.name} [${err.status}]`;
    let description = err.message;
    let type = "clientError" as "clientError" | "serverError";

    if (err.status) {
      description = err.response?.data?.message || "";

      if (err.status >= 400 && err.status < 500) {
        header = "Не удалось обновить данные фильтров";
        type = "clientError";
      } else if (err.status >= 500) {
        header = "Не удалось обновить данные фильтров";
        type = "serverError";
      }
    }

    addSnackbar(header, description, type);
  },
};
