import type { FiltersInitialValues } from "../types";
import { initialValues } from "../model";

import type { StoreItemCities } from "@/app/store/useCities/types";

export const getInitialValues = (
  data: FiltersInitialValues | undefined,
  cities: StoreItemCities[] | undefined,
) => {
  if (data) {
    if (cities && typeof data.city === "string") {
      data.city = cities.find((value) => value.value === data.city) || "";
    }
    return data;
  }
  return initialValues;
};
