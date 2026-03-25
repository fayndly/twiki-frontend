import type { PropsCardProfile } from "@/widgets/CardProfile";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type reactions = "like" | "dislike" | "appeal";

export interface CartProfile extends PropsCardProfile {
  userId: string;
  id: number;
  isRemoving: boolean;
}

export interface PropsPostReaction {
  reaction: reactions;
  cardId: number;
  appealData?: {
    type: string;
    description: string;
  };
}

type ViewingCardsMutationContext = {
  previousViewingCards?: CartProfile[];
};

export type PropsViewingCardsMutationOptions = UseMutationOptions<
  any,
  AxiosError<{ message: string }>,
  PropsPostReaction,
  ViewingCardsMutationContext
>;
