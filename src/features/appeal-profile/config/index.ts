import type { AppealInitialValues } from "../types";

export const optionsType = [
  {
    value: "",
    label: "Выберите причину жалобы",
  },
  {
    value: "11",
    label: "Чужое фото",
  },
  {
    value: "12",
    label: "Оскорбление",
  },
  {
    value: "13",
    label: "Непристойные фото",
  },
  {
    value: "14",
    label: "Спам",
  },
  {
    value: "15",
    label: "Другое",
  },
];

export const initialValues: AppealInitialValues = {
  type: optionsType[0].value,
  description: "",
};
