import type { DTOSympathyCard } from "../types";

import { api } from "@/app/api";

export const getSympathyCards = async (): Promise<DTOSympathyCard[]> => {
  const { data } = await api.get("/cards/sympathies");
  return data;
};
