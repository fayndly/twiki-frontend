import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { getViewingCards, postReaction } from "../api";

import { queryClient } from "@/app/store";

import type { ICartProfile, PropsViewingCardsMutationOptions } from "../types";

import { useAddWarningSnackbar } from "@/widgets/WarningSnackbar";

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

    queryClient.setQueryData<ICartProfile[]>(["viewingCards"], (old = []) =>
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

    return { previousViewingCards };
  },
  onSuccess: async (data: any) => {
    console.log("onSuccess data: " + data);
  },
  onError: (_err, vars, _onMutateResult, context) => {
    const addWarningSnackbar = useAddWarningSnackbar();
    addWarningSnackbar(
      `Не удалось отправить ${vars.reaction === "like" ? "лайк" : "дизлайк"}`,
      `Пользователь ${vars.cardId} не получил ${
        vars.reaction === "like" ? "лайк" : "дизлайк"
      }`,
      postReaction,
      vars
    );
    // console.log(err);
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
