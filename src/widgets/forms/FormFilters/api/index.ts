import { useEffect, useState } from "react";
import { api } from "@/app/api";

export const updateFilters = async (values: any) => {
  const { data } = await api.put("/filters", {
    ...values,
  });
  return data;
};

const getFilters = async () => {
  const { data } = await api.get("/filters");
  return data;
};

export const useGetterData = () => {
  const [dataFilters, setDataFilters] = useState(null);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [filtersResult] = await Promise.all([getFilters()]);
        if (!mounted) return;

        setDataFilters(filtersResult);
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

  return { dataFilters, isDataLoading };
};
