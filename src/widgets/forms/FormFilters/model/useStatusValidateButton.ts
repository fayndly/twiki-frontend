import type { ButtonSubmitStatuses } from "../types";

import { useEffect } from "react";

export const useStatusValidateButton = (
  buttonStatus: ButtonSubmitStatuses,
  setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
  canStatusButtonBeValidate: boolean
) => {
  useEffect(() => {
    if (
      buttonStatus !== "error" &&
      buttonStatus !== "loading" &&
      buttonStatus !== "success"
    ) {
      setButtonStatus(canStatusButtonBeValidate ? "valid" : "noValid");
    }
  }, [canStatusButtonBeValidate]);
};
