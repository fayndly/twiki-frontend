import { profileMutationQueryOptions, profileQueryOptions } from "./profile";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useProfile(enabled: boolean = true) {
  const profileQuery = useQuery(profileQueryOptions(enabled));
  const profileMutations = useMutation(profileMutationQueryOptions);

  const { data, isPending, isError, isSuccess, refetch } = profileQuery;

  return { data, isPending, isError, isSuccess, refetch, profileMutations };
}
