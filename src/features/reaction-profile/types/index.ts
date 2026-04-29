import type { UseMutationResult } from "@tanstack/react-query";
import type { IconName } from "lucide-react/dynamic";

export interface PropsButton {
  onClick: () => void;
  borderColor?: string;
  iconName: IconName;
  iconColor: string;
}
export interface PropsButtonReaction {
  id: number;
  mutations: UseMutationResult<any, any, any, any>;
  type: "like" | "dislike";
}
