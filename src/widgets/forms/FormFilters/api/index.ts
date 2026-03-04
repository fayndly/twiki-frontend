import { useEffect, useState } from "react";
import { api } from "@/app/api";

export const postFiltersUpdate = async (values: any): Promise<any> => {
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
