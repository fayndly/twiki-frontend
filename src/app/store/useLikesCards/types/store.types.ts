import type { PropsPostReaction } from "./api.types";

import type { UseMutationOptions } from "@tanstack/react-query";

import type { PropsCardProfile } from "@/widgets/CardProfile";

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
  Error,
  PropsPostReaction,
  LikesCardsMutationContext
>;
