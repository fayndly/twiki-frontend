import { api } from "@/app/api";
import { useEffect, useState } from "react";

export const postProfileUpdate = async (values: any) => {
  const { data } = await api.put("/profile", {
    ...values,
  });
  return data;
};

const getCities = async () => {
  const { data } = await api.get("/cities");
  return data;
};

const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
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
        setProfileData(profileResult);
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
