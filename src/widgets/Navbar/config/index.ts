import type { TabsList } from "../types";

import { paths } from "@/app/routes";

export const tabs = [
  {
    name: "sympathy",
    pathTo: paths.pageSympathyProfileCardsView,
    iconName: "message-circle-heart",
  },
  {
    name: "likes",
    pathTo: paths.pageLikesProfileCardsView,
    iconName: "heart-plus",
  },
  {
    name: "viewing",
    pathTo: paths.pageProfileCardsView,
    iconName: "users-round",
  },
] as TabsList[];

export const variants = {
  hidden: {
    y: 84,
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};
