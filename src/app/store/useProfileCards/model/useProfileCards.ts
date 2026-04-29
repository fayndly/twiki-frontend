import { getLikesCards, getViewingCards } from "../api";
import { cardsMutationOptions, cardsQueryOptions } from "./profileCards";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useLikesCards(enabled: boolean = true) {
  const likesCardsQuery = useQuery(
    cardsQueryOptions(enabled, "likesCards", getLikesCards),
  );
  const likesCardsMutations = useMutation(cardsMutationOptions("likesCards"));

  const { data, isPending, isError, isSuccess, refetch, error } =
    likesCardsQuery;

  return {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    likesCardsMutations,
    error,
  };
}

export function useViewingCards(enabled: boolean = true) {
  const viewingCardsQuery = useQuery(
    cardsQueryOptions(enabled, "viewingCards", getViewingCards),
  );
  const viewingCardsMutations = useMutation(
    cardsMutationOptions("viewingCards"),
  );

  const { data, isPending, isError, isSuccess, refetch, isFetching, error } =
    viewingCardsQuery;

  return {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    isFetching,
    viewingCardsMutations,
    error,
  };
}
