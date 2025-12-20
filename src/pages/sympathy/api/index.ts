import { cards } from "../mocks/cards";
import type { ICartSympathy } from "../types";

import { useEffect, useState } from "react";

const getSympathyCarts = async () => {
  const isError = false;

  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(cards);
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

        setSympathyCarts(JSON.parse(sympathyCartsResult));
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
