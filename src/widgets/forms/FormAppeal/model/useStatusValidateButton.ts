import type { FormikErrors } from "formik";
import type { ButtonSubmitStatuses } from "../types";

import { useEffect } from "react";

export const useStatusValidateButton = (
  buttonStatus: ButtonSubmitStatuses,
  setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
  canStatusButtonBeValidate: boolean,
  validateForm: () => Promise<FormikErrors<any>>,
  dirty?: boolean,
) => {
  useEffect(() => {
    validateForm();

    if (
      buttonStatus !== "error" &&
      buttonStatus !== "loading" &&
      buttonStatus !== "success"
    ) {
      if (!dirty) {
        setButtonStatus("noChanges");
      } else {
        setButtonStatus(canStatusButtonBeValidate ? "valid" : "noValid");
      }
    }
  }, [canStatusButtonBeValidate, dirty]);
};
