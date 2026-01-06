import axios from "axios";
import type { ICartSympathy } from "../types";

import { useEffect, useState } from "react";

const getSympathyCarts = async () => {
  try {
    const { data } = await axios.get(
      "https://twiki-api.ru.tuna.am/cards-sympathy"
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const useGetterData = () => {
  const [sympathyCarts, setSympathyCarts] = useState<ICartSympathy[]>([]);

  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [sympathyCartsResult] = await Promise.all([getSympathyCarts()]);
        if (!mounted) return;

        setSympathyCarts(sympathyCartsResult);
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

  return { sympathyCarts, setSympathyCarts, isDataLoading };
};
