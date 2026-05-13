// import type { UseMutationResult } from "@tanstack/react-query";

import type { PropsCardProfile } from "@/entities/CardProfile";
import type { ProfileCardsMutationResult } from "@/app/store/useProfileCards";

export interface PropsCardProfileWithActions extends Pick<
  PropsCardProfile,
  "imgUrl" | "name" | "age" | "city" | "description"
> {
  isLiked?: boolean;
  isDisliked?: boolean;
  isAppealed?: boolean;
  canRemove: () => void;
  id: number;
  mutations: ProfileCardsMutationResult;
  from: "viewingCards" | "likesCards";
}
