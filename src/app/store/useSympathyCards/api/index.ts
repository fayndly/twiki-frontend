import { api } from "@/app/api";

export const getSympathyCards = async () => {
  const { data } = await api.get("/cards/sympathies");
  return data;
};
