import axios from "axios";

export const getSympathyCards = async () => {
  const { data } = await axios.get(
    "https://twiki-api.ru.tuna.am/cards-sympathy"
  );
  return data;
};
