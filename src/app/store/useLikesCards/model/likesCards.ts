import { queryOptions } from "@tanstack/react-query";
import { getLikesCards, postReaction } from "../api";

import { queryClient } from "@/app/store";

import type {
  StoreItemCardProfile,
  PropsPostReaction,
  PropsLikesCardsMutationOptions,
} from "../types";
import { getAddWarningSnackbar } from "@/widgets/WarningSnackbar";

const mutateSetStatuses = (
  reaction: PropsPostReaction,
  canDeleteAppeal: boolean = false,
) => {
  queryClient.setQueryData<StoreItemCardProfile[]>(["likesCards"], (old = []) =>
    old.map((card) =>
      card.id === reaction.cardId
        ? {
            ...card,
            isRemoving:
              reaction.reaction !== "appeal"
                ? true
                : reaction.reaction === "appeal" && canDeleteAppeal,
            isLiked: reaction.reaction === "like",
            isDisliked: reaction.reaction === "dislike",
            isAppealed: reaction.reaction === "appeal" && canDeleteAppeal,
          }
        : card,
    ),
  );
};

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

    mutateSetStatuses(reaction);

    return { previousLikesCards };
  },
  onSuccess: async (data: any, reaction) => {
    console.log("onSuccess data: " + data);
    if (reaction.reaction === "appeal") {
      mutateSetStatuses(reaction, true);
    }
  },
  onError: (_err, vars, _onMutateResult, context) => {
    const addWarningSnackbar = getAddWarningSnackbar();
    addWarningSnackbar(
      `Не удалось отправить ${vars.reaction === "like" ? "лайк" : "дизлайк"}`,
      `Пользователь ${vars.cardId} не получил ${
        vars.reaction === "like" ? "лайк" : "дизлайк"
      }`,
      postReaction,
      vars,
    );

    console.log(context);
  },
};
