import { apiConfig } from "@/app/config";
import { useRawInitData } from "@tma.js/sdk-react";

import axios from "axios";

export const useSetInitDataRaw = () => {
  const initDataRaw = useRawInitData();

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `tma ${initDataRaw}`;
    return config;
  });
};

export const api = axios.create({
  baseURL: apiConfig.baseUrl,
});
