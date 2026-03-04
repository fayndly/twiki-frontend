import { api } from "@/app/api";
import type { ValuesUpdateProfile, ProfileDto } from "../types";

export const getProfile = async (): Promise<ProfileDto> => {
  const { data } = await api.get("/profile");
  return data;
};

export const updateProfile = async (
  values: ValuesUpdateProfile,
): Promise<ProfileDto> => {
  const { data } = await api.put(`/profile`, {
    ...values,
  });
  return data;
};
