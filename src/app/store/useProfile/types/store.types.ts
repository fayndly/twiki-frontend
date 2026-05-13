import type { ProfileInitialValues } from "@/widgets/forms/FormProfile/types";
import type { ValuesUpdateProfile } from "./api.types";

import type { UseMutationOptions } from "@tanstack/react-query";
import type { AxiosErrorDto } from "@/app/api";

export type StoreItemProfile = ProfileInitialValues;

type ProfileMutationContext = {
  previousProfile?: StoreItemProfile[];
};

export type PropsProfileMutationOptions = UseMutationOptions<
  ValuesUpdateProfile,
  AxiosErrorDto,
  ValuesUpdateProfile,
  ProfileMutationContext
>;
