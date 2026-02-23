import { postReaction, getViewingCards } from "../api";
import type {
  ICartProfile,
  PropsViewingCardsMutationOptions,
  PropsPostReaction,
} from "../types";

import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { getAddWarningSnackbar } from "@/widgets/WarningSnackbar";
import { queryClient } from "@/app/store";

const mutateSetStatuses = (
  reaction: PropsPostReaction,
  canDeleteAppeal: boolean = false,
) => {
  queryClient.setQueryData<ICartProfile[]>(["viewingCards"], (old = []) =>
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
  queryOptions<ICartProfile[]>({
    queryKey: ["viewingCards"],
    queryFn: getViewingCards,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

const viewingCardsMutationOptions: PropsViewingCardsMutationOptions = {
  mutationFn: postReaction,
  onMutate: async (reaction) => {
    await queryClient.cancelQueries({ queryKey: ["viewingCards"] });

    const previousViewingCards = queryClient.getQueryData<ICartProfile[]>([
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
