import type { PropsPostReaction } from "./api.types";

import type { UseMutationOptions } from "@tanstack/react-query";

import type { PropsCardProfile } from "@/widgets/CardProfile";
import type { AxiosError } from "axios";

export interface StoreItemCardProfile extends PropsCardProfile {
  userId: string;
  id: number;
  isRemoving: boolean;
}

type LikesCardsMutationContext = {
  previousLikesCards?: StoreItemCardProfile[];
};

export type PropsLikesCardsMutationOptions = UseMutationOptions<
  any,
  AxiosError<{ message: string }>,
  PropsPostReaction,
  LikesCardsMutationContext
>;
