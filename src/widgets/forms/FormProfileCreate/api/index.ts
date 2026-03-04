import { api } from "@/app/api";
import { useEffect, useState } from "react";

export const postProfileCreate = async (values: any) => {
  const { data } = await api.post("/profile", {
    ...values,
  });
  return data;
};

const getCities = async () => {
  const { data } = await api.get("/cities");
  return data;
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

        setCities(citiesResult);
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
