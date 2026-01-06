import type { ButtonSubmitStatuses } from "../types";

import { hapticFeedback, mainButton, miniApp } from "@tma.js/sdk-react";
import type { FormikErrors } from "formik";
import { useEffect } from "react";

export const useClickButton = (
  setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
  validateForm: () => Promise<FormikErrors<any>>,
  submitForm: () => Promise<any>,
  canShowButton: boolean,
  isSubmitting: boolean
) => {
  useEffect(() => {
    const handler = async () => {
      if (hapticFeedback.isSupported()) {
        hapticFeedback.impactOccurred("medium");
      }
      setButtonStatus("loading");
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setButtonStatus("noValid");
        return;
      }

      try {
        const result = await submitForm();
        console.log(result);

        if (result.data) {
          setButtonStatus("success");
          if (hapticFeedback.isSupported()) {
            hapticFeedback.notificationOccurred("success");
          }
          setTimeout(() => {
            miniApp.close();
          }, 1000);
        } else {
          throw new Error(result.response.data.message);
        }
      } catch (e) {
        console.log(e);

        setButtonStatus("error");
        if (hapticFeedback.isSupported()) {
          hapticFeedback.notificationOccurred("error");
        }
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
