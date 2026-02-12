import { themeParams } from "@tma.js/sdk-react";
import type { ParamsSubmitButton } from "../types";

export const getParams = (): ParamsSubmitButton => {
  return {
    valid: {
      bgColor: themeParams.buttonColor(),
      hasShineEffect: true,
      isEnabled: true,
      text: "Подтвердить",
      textColor: themeParams.buttonTextColor(),
    },
    noValid: {
      bgColor: themeParams.bottomBarBgColor(),
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
    noChanges: {
      bgColor: themeParams.bottomBarBgColor(),
      hasShineEffect: false,
      isEnabled: false,
      isLoaderVisible: false,
      text: "Измените данные",
      textColor: themeParams.textColor(),
    },
    void: {
      bgColor: themeParams.bottomBarBgColor(),
      hasShineEffect: false,
      isEnabled: false,
      isVisible: false,
      isLoaderVisible: false,
      text: "void",
      textColor: themeParams.bottomBarBgColor(),
    },
  };
};
