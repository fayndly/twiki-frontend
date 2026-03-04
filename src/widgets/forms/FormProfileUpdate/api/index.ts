import { api } from "@/app/api";
import { useEffect, useState } from "react";

export const postProfileUpdate = async (values: any) => {
  const { data } = await api.put("/profile", {
    ...values,
  });
  return data;
};

const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

export const useGetterData = () => {
  const [dataProfile, setDataProfile] = useState(null);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [profileResult] = await Promise.all([getProfile()]);
        if (!mounted) return;

        setDataProfile(profileResult);
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

  return { dataProfile, isDataLoading };
};
