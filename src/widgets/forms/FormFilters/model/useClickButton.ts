import type { ButtonSubmitStatuses } from "../types";

import { useNavigate } from "react-router-dom";
import { mainButton } from "@tma.js/sdk-react";
import type { FormikErrors } from "formik";
import { useEffect } from "react";

import { supportHapticFeedback } from "@/shared/helpers/supportHapticFeedback";

export const useClickButton = (
  setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
  validateForm: () => Promise<FormikErrors<any>>,
  submitForm: () => Promise<any>,
  canShowButton: boolean,
  isSubmitting: boolean,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = async () => {
      supportHapticFeedback("medium");
      setButtonStatus("loading");
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setButtonStatus("noValid");
        return;
      }

      try {
        const result = await submitForm();
        console.log(result);
        setButtonStatus("success");
        supportHapticFeedback("success");

        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } catch (e) {
        console.log(e);

        setButtonStatus("error");
        supportHapticFeedback("error");
        setTimeout(() => {
          setButtonStatus(canShowButton ? "valid" : "noValid");
        }, 2000);
      }
    };

    mainButton.onClick(handler);

    return () => {
      mainButton.offClick(handler);
    };
  }, [submitForm, validateForm, isSubmitting]);
};
