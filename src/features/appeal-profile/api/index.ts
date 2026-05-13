import type { CardId } from "../types";
import type { AppealInitialValues } from "../types";

import type { UseMutateAsyncFunction } from "@tanstack/react-query";

export const submit = async (
  values: AppealInitialValues,
  cardId: CardId,
  mutateFn: UseMutateAsyncFunction<any, Error, any, any>,
) => {
  if (!cardId) {
    return Promise.reject(new Error("cardId is missing"));
  }

  await mutateFn({
    reaction: "appeal",
    cardId,
    appealData: values,
  });
};
