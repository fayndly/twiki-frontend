import { api } from "@/app/api";
import type { ValuesUpdateFilters } from "../types";
import type { DTOFilters } from "../types/api.types";

export const getFilters = async (): Promise<DTOFilters> => {
  const { data } = await api.get("/filters");
  return data;
};

export const updateFilters = async (
  values: ValuesUpdateFilters,
): Promise<DTOFilters> => {
  const { data } = await api.put(`/filters`, {
    ...values,
  });
  return data;
};
