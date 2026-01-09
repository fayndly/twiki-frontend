import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { getLikesCards, postReaction } from "../api";

import { queryClient } from "@/app/store";

import type {
  ICartProfile,
  PropsPostReaction,
  PropsLikesCardsMutationOptions,
} from "../types";

const likesCardsQueryOptions = () =>
  queryOptions<ICartProfile[]>({
    queryKey: ["likesCards"],
    queryFn: getLikesCards,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

const likesCardsMutationOptions: PropsLikesCardsMutationOptions = {
  mutationFn: postReaction,
  onMutate: async (reaction: PropsPostReaction) => {
    await queryClient.cancelQueries({ queryKey: ["likesCards"] });

    const previousLikesCards = queryClient.getQueryData<ICartProfile[]>([
      "likesCards",
    ]);

    queryClient.setQueryData<ICartProfile[]>(["likesCards"], (old = []) =>
      old.map((card) =>
        card.id === reaction.cardId
          ? {
              ...card,
              isRemoving: true,
              isLiked: reaction.reaction === "like",
              isDisliked: reaction.reaction === "dislike",
            }
          : card
      )
    );

    return { previousLikesCards };
  },
  onSuccess: async (data: any) => {
    console.log("onSuccess data: " + data);
  },
  onError: (error, variables) => {
    console.log(error);
    console.log(variables);
  },
};

export function useLikesCards() {
  const likesCardsQuery = useQuery(likesCardsQueryOptions());
  const likesCardsMutations = useMutation(likesCardsMutationOptions);

  const { data, isPending, isError, isSuccess, refetch } = likesCardsQuery;

  return { data, isPending, isError, isSuccess, refetch, likesCardsMutations };
}
