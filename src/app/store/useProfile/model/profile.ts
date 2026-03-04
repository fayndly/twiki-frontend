import { getProfile, updateProfile } from "../api";

import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "../..";

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

export const profileMutationQueryOptions = {
  mutationFn: updateProfile,
  onSuccess: async (data: any) => {
    queryClient.setQueryData(["profile"], data);
  },
};
