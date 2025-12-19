export const postFiltersUpdate = async (values: any): Promise<any> => {
  const isError = false;
  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(values, null, 2);
  }
};

export const getCities = async (): Promise<any> => {
  const isError = false;
  const cities = [
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

  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(cities);
  }
};

export const getProfile = async (): Promise<any> => {
  const isError = false;
  const profile = {
    firstAge: 32,
    lastAge: 34,
    sex: "male",
    city: { value: "77", label: "Москва" },
  };

  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(profile);
  }
};
