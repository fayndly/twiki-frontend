import { themeParams } from "@tma.js/sdk-react";

export const initialValues = {
  firstName: "",
  age: 0,
  description: "",
  sex: "male" as "male" | "female",
  photo: undefined,
  // photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/500px-Muhammad_Ali_NYWTS.jpg",
  city: { value: "77", label: "Москва" },
};

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
