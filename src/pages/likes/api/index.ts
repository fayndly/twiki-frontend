import { cards } from "../mocks/cards";
import type { ICartProfile } from "../types";

import { useEffect, useState } from "react";

export const getProfileCarts = async () => {
  const isError = false;

  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(cards);
  }
};

export const useGetterData = () => {
  const [profileCarts, setProfileCarts] = useState<ICartProfile[]>([]);

  const [isDataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setDataLoading(true);
      try {
        const [profileCartsResult] = await Promise.all([getProfileCarts()]);
        if (!mounted) return;

        setProfileCarts(JSON.parse(profileCartsResult));
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

  return { profileCarts, setProfileCarts, isDataLoading };
};
