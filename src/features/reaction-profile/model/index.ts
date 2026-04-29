import type { UseMutationResult } from "@tanstack/react-query";

export const reactionCardHandler = (
  mutations: UseMutationResult,
  type: "like" | "dislike",
  cardId: number,
) => {
  mutations.mutate({ reaction: type, cardId });
};
