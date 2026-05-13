import { api } from "@/app/api";

export const postProfileCreate = async (values: any) => {
  const { data } = await api.post("/profile", {
    ...values,
  });
  return data;
};
