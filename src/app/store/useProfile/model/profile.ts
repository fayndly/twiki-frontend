import { getProfile, updateProfile } from "../api";

import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "../..";
import type { PropsProfileMutationOptions } from "../types";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";

export const profileQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
    select: (dto) => ({
      ...dto,
      city: dto.cityId,
    }),
  });

export const profileMutationQueryOptions: PropsProfileMutationOptions = {
  mutationFn: updateProfile,
  onSuccess: async (data: any) => {
    queryClient.setQueryData(["profile"], data);
  },
  onError: (err, _vars, _onMutateResult, _context) => {
    const addSnackbar = getAddSnackbar();

    let header = `${err.name} [${err.status}]`;
    let description = err.message;
    let type = "clientError" as "clientError" | "serverError";

    if (err.status) {
      description = err.response?.data?.message || "";
      if (err.status >= 400 && err.status < 500) {
        header = "Не удалось обновить данные профиля";
        type = "clientError";
      } else if (err.status >= 500) {
        header = "Не удалось обновить данные профиля";
        type = "serverError";
      }
    }

    addSnackbar(header, description, type);
  },
};
