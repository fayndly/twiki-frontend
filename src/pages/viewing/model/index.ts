import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { getViewingCards, postReaction } from "../api";

import { queryClient } from "@/app/store";

import type {
  ICartProfile,
  PropsPostReaction,
  PropsViewingCardsMutationOptions,
} from "../types";

const viewingCardsQueryOptions = () =>
  queryOptions<ICartProfile[]>({
    queryKey: ["viewingCards"],
    queryFn: getViewingCards,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

const viewingCardsMutationOptions: PropsViewingCardsMutationOptions = {
  mutationFn: postReaction,
  onMutate: async (reaction: PropsPostReaction) => {
    await queryClient.cancelQueries({ queryKey: ["viewingCards"] });

    const previousViewingCards: ICartProfile[] | undefined =
      queryClient.getQueryData(["viewingCards"]);

    const newViewingCards = previousViewingCards?.length
      ? previousViewingCards.map((card: ICartProfile) => {
          if (card.id === reaction.cardId) {
            return reaction.reaction === "like"
              ? { ...card, isLiked: true }
              : { ...card, isDisliked: true };
          } else {
            return card;
          }
        })
      : [];

    setTimeout(() => {
      queryClient.setQueryData(
        ["viewingCards"],
        newViewingCards.filter((card) => card.id !== reaction.cardId)
      );
    }, 300);

    queryClient.setQueryData(["viewingCards"], newViewingCards || []);

    return { previousViewingCards };
  },
  onSuccess: async (data: any) => {
    console.log("onSuccess data: " + data);
  },
  onError: (error, variables) => {
    console.log(error);
    console.log(variables);
  },
};

export function useViewingCards() {
  const viewingCardsQuery = useQuery(viewingCardsQueryOptions());
  const viewingCardsMutations = useMutation(viewingCardsMutationOptions);

  const { data, isPending, isError, isSuccess, refetch, isFetching } =
    viewingCardsQuery;

  return {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    isFetching,
    viewingCardsMutations,
  };
}
