import type { PropsPostReaction } from "../types";

import { apiConfig } from "@/app/config";

import axios from "axios";

export const getViewingCards = async () => {
  const { data } = await axios.get(`${apiConfig.baseUrl}/cards-profile`);
  return data;
};

export const postReaction = async ({ reaction, cardId }: PropsPostReaction) => {
  const { data } = await axios.post(`${apiConfig.baseUrl}/reaction/viewing`, {
    cardId,
    reaction,
  });
  return data;
};
