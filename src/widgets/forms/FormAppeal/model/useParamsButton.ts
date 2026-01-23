import type { ButtonSubmitStatuses } from "../types";

import { mainButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

export const useParamsButton = (
  getParamsButton: () => any,
  buttonStatus: ButtonSubmitStatuses,
) => {
  const paramsButton = getParamsButton();

  useEffect(() => {
    mainButton.setParams(paramsButton[buttonStatus]);
  }, [buttonStatus]);
};
