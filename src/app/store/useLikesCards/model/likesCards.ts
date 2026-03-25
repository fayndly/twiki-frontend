import type {
  StoreItemCardProfile,
  PropsPostReaction,
  PropsLikesCardsMutationOptions,
} from "../types";
import { postReaction, getLikesCards } from "../api";

import { queryOptions } from "@tanstack/react-query";

import { queryClient } from "@/app/store";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";

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
  onError: (err, vars, _onMutateResult, _context) => {
    const addSnackbar = getAddSnackbar();

    const reactionsTranslate = {
      like: "лайк",
      dislike: "дизлайк",
      appeal: "жалобу",
    };

    let header = `${err.name} [${err.status}]`;
    let description = err.message;
    let type = "clientError" as "clientError" | "serverError";

    if (err.status) {
      if (err.status >= 400 && err.status < 500) {
        header = `Не удалось отправить ${reactionsTranslate[vars.reaction]}`;
        description = err.response?.data?.message || "";
        type = "clientError";
      } else if (err.status >= 500) {
        header = `Не удалось отправить ${reactionsTranslate[vars.reaction]}`;
        description = err.response?.data?.message || "";
        type = "serverError";
      }
    }

    addSnackbar(header, description, type, postReaction, vars);
  },
};
