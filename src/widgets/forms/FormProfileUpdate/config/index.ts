import { themeParams } from "@tma.js/sdk-react";

export const cities = [
  { value: "77", label: "Москва" },
  { value: "78", label: "Санкт-Петербург" },
  { value: "23", label: "Сочи" },
  { value: "16", label: "Казань" },
  { value: "66", label: "Екатеринбург" },
  { value: "54", label: "Новосибирск" },
  { value: "52", label: "Нижний Новгород" },
  { value: "39", label: "Калининград" },
  { value: "24", label: "Красноярск" },
  { value: "72", label: "Тюмень" },
  { value: "20", label: "Грозный" },
];

export const initialValues = {
  firstName: "Muhammad Ali",
  age: 33,
  description:
    "Олимпийский чемпион 1960 года в полутяжёлой весовой категории, абсолютный чемпион мира в тяжёлом весе",
  sex: "male",
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
      isVisible: true,
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
