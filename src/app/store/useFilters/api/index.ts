import { api } from "@/app/api";
import type { ValuesUpdateFilters } from "../types";
import type { FiltersDto } from "../types/api.types";

export const getFilters = async (): Promise<FiltersDto> => {
  const { data } = await api.get("/filters");
  return data;
};

export const updateFilters = async (
  values: ValuesUpdateFilters,
): Promise<FiltersDto> => {
  const { data } = await api.put(`/filters`, {
    ...values,
  });
  return data;
};
