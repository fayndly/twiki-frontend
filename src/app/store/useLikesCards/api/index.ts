import type { PropsPostReaction } from "../types";

import { apiConfig } from "@/app/config";

import axios from "axios";

export const getLikesCards = async () => {
  const { data } = await axios.get(`${apiConfig.baseUrl}/cards-likes`);
  return data;
};

export const postReaction = async ({
  reaction,
  cardId,
  appealData,
}: PropsPostReaction) => {
  console.log("post reaction");

  const { data } = await axios.post(
    `${apiConfig.baseUrl}/reaction/${reaction}`,
    {
      cardId,
      appealData,
    },
  );
  return data;
};
