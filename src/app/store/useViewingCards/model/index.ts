import { postReaction, getViewingCards } from "../api";
import type {
  CartProfile,
  PropsViewingCardsMutationOptions,
  PropsPostReaction,
} from "../types";

import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { getAddSnackbar } from "@/widgets/SnackbarContainer";
import { queryClient } from "@/app/store";

const mutateSetStatuses = (
  reaction: PropsPostReaction,
  canDeleteAppeal: boolean = false,
) => {
  queryClient.setQueryData<CartProfile[]>(["viewingCards"], (old = []) =>
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

const viewingCardsQueryOptions = () =>
  queryOptions<CartProfile[]>({
    queryKey: ["viewingCards"],
    queryFn: getViewingCards,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

const viewingCardsMutationOptions: PropsViewingCardsMutationOptions = {
  mutationFn: postReaction,
  onMutate: async (reaction) => {
    await queryClient.cancelQueries({ queryKey: ["viewingCards"] });

    const previousViewingCards = queryClient.getQueryData<CartProfile[]>([
      "viewingCards",
    ]);

    mutateSetStatuses(reaction);

    return { previousViewingCards };
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
