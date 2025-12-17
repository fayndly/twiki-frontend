export const postProfileUpdate = async (values: any): Promise<any> => {
  const isError = true;
  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(values, null, 2);
  }
};
