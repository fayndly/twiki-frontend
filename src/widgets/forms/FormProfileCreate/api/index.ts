export const postProfileCreate = async (values: any): Promise<any> => {
  const isError = false;
  await new Promise((res) => setTimeout(res, 2000));
  if (isError) {
    throw new Error("Ошибка");
  } else {
    return JSON.stringify(values, null, 2);
  }
};
