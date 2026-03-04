import type { ProfileInitialValues } from "@/widgets/forms/FormProfile/types";
import type { ValuesUpdateProfile } from "./api.types";

import type { UseMutationOptions } from "@tanstack/react-query";

export interface StoreItemProfile extends ProfileInitialValues {}

type ProfileMutationContext = {
  previousProfile?: StoreItemProfile[];
};

export type PropsProfileMutationOptions = UseMutationOptions<
  any,
  Error,
  ValuesUpdateProfile,
  ProfileMutationContext
>;
