import type { DTOProfileCard, PropsPostReaction } from "./api.types";

import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import type { PropsCardProfile } from "@/entities/CardProfile";
import type { AxiosErrorDto } from "@/app/api";

export interface StoreItemCardProfile extends Pick<
  PropsCardProfile,
  "imgUrl" | "name" | "age" | "city" | "description"
> {
  id: number;
  isRemoving?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  isAppealed?: boolean;
}

type CardsMutationContext = {
  previousCards?: StoreItemCardProfile[];
};

export type PropsCardsMutationOptions = UseMutationOptions<
  DTOProfileCard,
  AxiosErrorDto,
  PropsPostReaction,
  CardsMutationContext
>;

export type QueryKeyProfileCards = "likesCards" | "viewingCards";

export type ProfileCardsMutationResult = UseMutationResult<
  DTOProfileCard,
  AxiosErrorDto,
  PropsPostReaction,
  CardsMutationContext
>;
