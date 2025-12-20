import { cards } from "../mocks/cards";
import type { ICartProfile } from "../types";

import { shuffle } from "@/shared/helpers";

import { useEffect, useState } from "react";

export const getProfileCarts = async () => {
  const isError = false;

  await new Promise((res) => setTimeout(res, 5000));
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

        const carts: ICartProfile[] = JSON.parse(profileCartsResult);

        setProfileCarts(shuffle(carts));
      } catch (e) {
        console.log(e);
      } finally {
        if (mounted) setDataLoading(false);
      }
    };

    if (profileCarts.length === 0) {
      fetchAll();
    }

    return () => {
      mounted = false;
    };
  }, [profileCarts]);

  return { profileCarts, setProfileCarts, isDataLoading };
};
