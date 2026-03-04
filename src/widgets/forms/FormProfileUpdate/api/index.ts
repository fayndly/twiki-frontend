import { api } from "@/app/api";
import { useEffect, useState } from "react";

export const postProfileUpdate = async (values: any): Promise<any> => {
  const isError = false;
  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(values, null, 2);
  }
};

const getCities = async (): Promise<any> => {
  const { data } = await api.get("/cities");
  return data;
};

const getProfile = async (): Promise<any> => {
  const isError = false;
  const profile = {
    firstName: "Muhammad Ali",
    age: 33,
    description:
      "Олимпийский чемпион 1960 года в полутяжёлой весовой категории, абсолютный чемпион мира в тяжёлом весе",
    sex: "male",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/500px-Muhammad_Ali_NYWTS.jpg",
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

        setCities(citiesResult);
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
