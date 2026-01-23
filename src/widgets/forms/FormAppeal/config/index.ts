import { themeParams } from "@tma.js/sdk-react";
import * as Yup from "yup";
import type { AppealInitialValues } from "../types";

export const typeOptions = [
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
  type: typeOptions[0].value,
  description: "",
};

export const validationSchema = Yup.object({
  type: Yup.mixed()
    .nullable()
    .test("type", function (value) {
      const { createError } = this;

      // console.log(value);

      if (typeof value === "string") {
        if (!["11", "12", "13", "14", "15"].includes(value)) {
          return createError({ message: "Выберите тип из списка" });
        }
      }

      return true;
    })
    .required("Это поле обязательное"),
  description: Yup.string().max(
    200,
    "Описание должно содержать не более 200-та символов",
  ),
});

export const getParamsButton = () => {
  return {
    valid: {
      bgColor: themeParams.buttonColor(),
      hasShineEffect: true,
      isEnabled: true,
      text: "Подтвердить",
      textColor: themeParams.buttonTextColor(),
    },
    noValid: {
      bgColor: themeParams.headerBgColor(),
      hasShineEffect: false,
      isEnabled: false,
      isLoaderVisible: false,
      text: "Заполните форму",
      textColor: themeParams.textColor(),
    },
    loading: {
      isLoaderVisible: true,
      hasShineEffect: false,
    },
    success: {
      isLoaderVisible: false,
      bgColor: "#3dcf5d" as `#${string}`,
      text: "Отправлено",
      isEnabled: false,
      hasShineEffect: false,
    },
    error: {
      isLoaderVisible: false,
      bgColor: themeParams.destructiveTextColor(),
      text: "Ошибка",
      isEnabled: false,
      hasShineEffect: false,
    },
  };
};
