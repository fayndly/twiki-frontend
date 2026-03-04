import { useEffect, useState } from "react";
import { api } from "@/app/api";

export const updateFilters = async (values: any) => {
  const { data } = await api.put("/filters", {
    ...values,
  });
  return data;
};

const getCities = async () => {
  const { data } = await api.get("/cities");
  return data;
};

const getFilters = async () => {
  const { data } = await api.get("/filters");
  return data;
};

export const useGetterData = () => {
  const [cities, setCities] = useState([]);
  const [filtersData, setFiltersData] = useState(null);
  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [citiesResult, filtersResult] = await Promise.all([
          getCities(),
          getFilters(),
        ]);
        if (!mounted) return;

        setCities(citiesResult);
        setFiltersData(filtersResult);
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

  return { cities, filtersData, isDataLoading };
};
