import type { FiltersInitialValues } from "@/widgets/forms/FormFilters/types";
import type { ValuesUpdateFilters } from "./api.types";

import type { UseMutationOptions } from "@tanstack/react-query";
import type { AxiosErrorDto } from "@/app/api";

export interface StoreItemFilters extends FiltersInitialValues {}

type LikesCardsMutationContext = {
  previousLikesCards?: StoreItemFilters[];
};

export type PropsLikesCardsMutationOptions = UseMutationOptions<
  any,
  AxiosErrorDto,
  ValuesUpdateFilters,
  LikesCardsMutationContext
>;
