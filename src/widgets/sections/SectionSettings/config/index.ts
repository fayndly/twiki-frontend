import { paths } from "@/app/routes";
import type { CellsData } from "../types";

export const cellsData: CellsData[] = [
  {
    title: "Фильтры",
    subtitle: "Возраст, пол, город",
    moveTitle: "Изменить",
    beforeIcon: {
      colorContainer: "#007AFE",
      name: "funnel",
    },
    pathNavigateTo: paths.pageFiltersEdit,
  },
  {
    title: "Анкета",
    subtitle: "Имя, возраст, описание, пол, фото, город",
    moveTitle: "Редактировать",
    beforeIcon: {
      colorContainer: "#B45ED5",
      name: "user-round-pen",
    },
    pathNavigateTo: paths.pageProfileCardEdit,
  },
];
