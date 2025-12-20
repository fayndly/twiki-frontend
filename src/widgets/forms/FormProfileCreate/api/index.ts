import { useEffect, useState } from "react";

export const postProfileCreate = async (values: any): Promise<any> => {
  const isError = false;
  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(values, null, 2);
  }
};

const getCities = async (): Promise<any> => {
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

export const useGetterData = () => {
  const [cities, setCities] = useState([]);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [citiesResult] = await Promise.all([getCities()]);
        if (!mounted) return;

        setCities(JSON.parse(citiesResult));
      } catch (e) {
        console.log(e);
      } finally {
        if (mounted) setDataLoading(false);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  return { cities, isDataLoading };
};
