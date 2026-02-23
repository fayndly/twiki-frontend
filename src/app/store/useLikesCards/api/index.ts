import { api } from "@/app/api";
import type { PropsPostReaction } from "../types";

export const getLikesCards = async () => {
  const { data } = await api.get("/cards-likes");
  return data;
};

export const postReaction = async ({
  reaction,
  cardId,
  appealData,
}: PropsPostReaction) => {
  const { data } = await api.post(`/reaction/${reaction}`, {
    cardId,
    appealData,
  });
  return data;
};
