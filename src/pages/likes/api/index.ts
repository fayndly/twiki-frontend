import type { ICartProfile } from "../types";
import axios from "axios";

import { useEffect, useState } from "react";

export const getProfileCarts = async () => {
  try {
    const { data } = await axios.get(
      "https://twiki-api.ru.tuna.am/cards-likes"
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
        const [profileCartsResult] = await Promise.all([getProfileCarts()]);
        if (!mounted) return;

        setProfileCarts(profileCartsResult);
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
