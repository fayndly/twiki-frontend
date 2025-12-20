import { useEffect, useState } from "react";

export const postProfileUpdate = async (values: any): Promise<any> => {
  const isError = true;
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

const getProfile = async (): Promise<any> => {
  const isError = false;
  const profile = {
    firstName: "Muhammad Ali",
    age: 33,
    description:
      "Олимпийский чемпион 1960 года в полутяжёлой весовой категории, абсолютный чемпион мира в тяжёлом весе",
    sex: "male",
    photo: undefined,
    // photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/500px-Muhammad_Ali_NYWTS.jpg",
    city: { value: "77", label: "Москва" },
  };

  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(profile);
  }
};

export const useGetterData = () => {
  const [cities, setCities] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [citiesResult, profileResult] = await Promise.all([
          getCities(),
          getProfile(),
        ]);
        if (!mounted) return;

        setCities(JSON.parse(citiesResult));
        setProfileData(JSON.parse(profileResult));
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

  return { cities, profileData, isDataLoading };
};
