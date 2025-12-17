import { mainButton } from "@tma.js/sdk-react";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import type { ButtonSubmitStatuses } from "../types";

import { getParamsButton } from "../config";

export function FormStateWatcher() {
  const { isValid, dirty, isSubmitting, submitForm, validateForm } =
    useFormikContext<any>();

  const canShowButton = dirty && isValid && !isSubmitting;

  const [buttonStatus, setButtonStatus] =
    useState<ButtonSubmitStatuses>("noValid");

  const paramsButton = getParamsButton();

  useEffect(() => {
    mainButton.setParams(paramsButton[buttonStatus]);
  }, [buttonStatus]);

  useEffect(() => {
    if (
      buttonStatus !== "error" &&
      buttonStatus !== "loading" &&
      buttonStatus !== "success"
    ) {
      setButtonStatus(canShowButton ? "valid" : "noValid");
    }
  }, [canShowButton]);

  useEffect(() => {
    const handler = async () => {
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
      } catch (e) {
        console.log(e);

        setButtonStatus("error");
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

  return null;
}
