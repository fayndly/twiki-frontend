import { type IPropsCardProfile } from "@/widgets/CardProfile";

import type { UseMutationOptions } from "@tanstack/react-query";

export interface ICartProfile extends IPropsCardProfile {
  userId: string;
  id: number;
  isRemoving: boolean;
}

export interface PropsPostReaction {
  reaction: "like" | "dislike";
  cardId: number;
}

type LikesCardsMutationContext = {
  previousLikesCards?: ICartProfile[];
};

export type PropsLikesCardsMutationOptions = UseMutationOptions<
  any,
  Error,
  PropsPostReaction,
  LikesCardsMutationContext
>;
