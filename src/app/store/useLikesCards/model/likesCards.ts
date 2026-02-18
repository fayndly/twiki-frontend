import { queryOptions } from "@tanstack/react-query";
import { getLikesCards, postReaction } from "../api";

import { queryClient } from "@/app/store";

import type {
  StoreItemCardProfile,
  PropsPostReaction,
  PropsLikesCardsMutationOptions,
} from "../types";

export const likesCardsQueryOptions = (enabled: boolean) =>
  queryOptions<StoreItemCardProfile[]>({
    queryKey: ["likesCards"],
    queryFn: getLikesCards,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
  });

export const likesCardsMutationOptions: PropsLikesCardsMutationOptions = {
  mutationFn: postReaction,
  onMutate: async (reaction: PropsPostReaction) => {
    await queryClient.cancelQueries({ queryKey: ["likesCards"] });

    const previousLikesCards = queryClient.getQueryData<StoreItemCardProfile[]>(
      ["likesCards"],
    );

    queryClient.setQueryData<StoreItemCardProfile[]>(
      ["likesCards"],
      (old = []) =>
        old.map((card) =>
          card.id === reaction.cardId
            ? {
                ...card,
                isRemoving: true,
                isLiked: reaction.reaction === "like",
                isDisliked: reaction.reaction === "dislike",
              }
            : card,
        ),
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
