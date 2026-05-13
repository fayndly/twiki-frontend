import type {
  StoreItemCardProfile,
  PropsPostReaction,
  PropsCardsMutationOptions,
  QueryKeyProfileCards,
  DTOProfileCard,
} from "../types";
import { postReaction } from "../api";

import { queryOptions } from "@tanstack/react-query";

import { queryClient } from "@/app/store";
import type { AxiosErrorDto } from "@/app/api";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";

const mutateSetStatuses = (
  reaction: PropsPostReaction,
  canDeleteAppeal: boolean = false,
  queryKey: QueryKeyProfileCards,
) => {
  queryClient.setQueryData<StoreItemCardProfile[]>([queryKey], (old = []) =>
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

export const cardsQueryOptions = (
  enabled: boolean = false,
  queryKey: QueryKeyProfileCards,
  queryFn: () => Promise<DTOProfileCard[]>,
) =>
  queryOptions<StoreItemCardProfile[], AxiosErrorDto>({
    queryKey: [queryKey],
    queryFn, // getViewingCards or getLikesCards
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled,
  });

export const cardsMutationOptions: (
  queryKey: QueryKeyProfileCards,
) => PropsCardsMutationOptions = (queryKey) => ({
  mutationFn: postReaction,
  onMutate: async (reaction) => {
    await queryClient.cancelQueries({ queryKey: [queryKey] });

    const previousCards = queryClient.getQueryData<StoreItemCardProfile[]>([
      queryKey,
    ]);

    mutateSetStatuses(reaction, false, queryKey);

    return { previousCards };
  },
  onSuccess: async (_data, reaction) => {
    if (reaction.reaction === "appeal") {
      mutateSetStatuses(reaction, true, queryKey);
      const addSnackbar = getAddSnackbar();

      addSnackbar(
        "Жалоба отправлена",
        "Спасибо за обращение. Мы проверим эту анкету.",
        "confirm",
      );
    }
  },
  onError: (err, vars) => {
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
});
