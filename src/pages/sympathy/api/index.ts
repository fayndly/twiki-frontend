import { apiConfig } from "@/app/config";

import axios from "axios";

export const getSympathyCards = async () => {
  const { data } = await axios.get(`${apiConfig.baseUrl}/cards-sympathy`);
  return data;
};
