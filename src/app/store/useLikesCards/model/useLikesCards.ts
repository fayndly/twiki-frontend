import {
  likesCardsMutationOptions,
  likesCardsQueryOptions,
} from "./likesCards";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useLikesCards(enabled: boolean = true) {
  const likesCardsQuery = useQuery(likesCardsQueryOptions(enabled));
  const likesCardsMutations = useMutation(likesCardsMutationOptions);

  const { data, isPending, isError, isSuccess, refetch, error } =
    likesCardsQuery;

  return { data, isPending, isError, isSuccess, refetch, likesCardsMutations, error  };
}
