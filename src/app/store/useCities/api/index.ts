import { api } from "@/app/api";

export const getCities = async () => {
  const { data } = await api.get("/cities");
  return data;
};
