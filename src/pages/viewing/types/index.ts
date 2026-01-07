import { type IPropsCardProfile } from "@/widgets/CardProfile";
import type { UseMutationOptions } from "@tanstack/react-query";

export interface ICartProfile extends IPropsCardProfile {
  userId: string;
  id: number;
}

export interface PropsPostReaction {
  reaction: "like" | "dislike";
  cardId: number;
}

type ViewingCardsMutationContext = {
  previousViewingCards?: ICartProfile[];
};

export type PropsViewingCardsMutationOptions = UseMutationOptions<
  any,
  Error,
  PropsPostReaction,
  ViewingCardsMutationContext
>;
