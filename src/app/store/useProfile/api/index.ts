import { api } from "@/app/api";
import type { ValuesUpdateProfile, DTOProfile } from "../types";

export const getProfile = async (): Promise<DTOProfile> => {
  const { data } = await api.get("/profile");
  return data;
};

export const updateProfile = async (
  values: ValuesUpdateProfile,
): Promise<DTOProfile> => {
  const { data } = await api.put(`/profile`, {
    ...values,
  });
  return data;
};
