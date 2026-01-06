import type { ICartProfile } from "../types";
import axios from "axios";

import { useEffect, useState } from "react";

export const getProfileCarts = async () => {
  try {
    const { data } = await axios.get(
      "https://twiki-api.ru.tuna.am/cards-profile"
    );
    return data;
  } catch (error) {
    return error;
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
        const [profileCardsResult]: [Array<ICartProfile>] = await Promise.all([
          getProfileCarts(),
        ]);
        if (!mounted) return;

        setProfileCarts(profileCardsResult);
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
