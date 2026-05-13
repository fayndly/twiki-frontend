import { api } from "@/app/api";
import type { DTOCities } from "../types";

export const getCities = async (): Promise<DTOCities[]> => {
  const { data } = await api.get("/cities");
  return data;
};
