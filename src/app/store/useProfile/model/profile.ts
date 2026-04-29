import { getProfile, updateProfile } from "../api";
import type { PropsProfileMutationOptions } from "../types";

import { queryOptions } from "@tanstack/react-query";

import { queryClient } from "@/app/store";
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
  onSuccess: async (data) => {
    const addSnackbar = getAddSnackbar();

    queryClient.setQueryData(["profile"], data);
    addSnackbar(
      "Анкета успешно обновлена",
      "Теперь другие пользователи увидят новые данные вашей анкеты.",
      "confirm",
    );
  },
  onError: (err) => {
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
