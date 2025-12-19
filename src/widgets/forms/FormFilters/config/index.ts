import { themeParams } from "@tma.js/sdk-react";
import * as Yup from "yup";
import type { FiltersInitialValues } from "../types";

export const initialValues: FiltersInitialValues = {
  firstAge: 0,
  lastAge: 0,
  sex: "male",
  city: "",
};

export const validationSchema = Yup.object({
  firstAge: Yup.number()
    .max(Yup.ref("lastAge"), "Первый возраст не может быть больше последнего")
    .min(1, "Минимальный возраст 1 год")
    .required("Эти поля обязательны"),
  lastAge: Yup.number()
    .max(99, "Максимальный возраст 99 лет")
    .min(Yup.ref("firstAge"), "Последний возраст не может быть меньше первого")
    .required("Эти поля обязательны"),
  sex: Yup.mixed()
    .nullable()
    .test("sex", function (value) {
      const { createError } = this;

      if (typeof value === "string") {
        if (!["male", "female"].includes(value)) {
          return createError({ message: "Выберите пол из списка" });
        }
      }

      return true;
    })
    .required("Это поле обязательное"),
  city: Yup.mixed()
    .nullable()
    .test("city", function (value) {
      const { createError } = this;

      if (typeof value === "string") {
        return createError({ message: "Выберите город из списка" });
      }

      return true;
    })
    .required("Это поле обязательное"),
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
