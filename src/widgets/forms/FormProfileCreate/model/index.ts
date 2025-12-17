import type { ButtonSubmitStatuses } from "../types";
import { getParamsButton } from "../config";

import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { hapticFeedback, mainButton, miniApp } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";

export function FormStateWatcher() {
  const navigate = useNavigate();

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
        setButtonStatus("success");
        if (hapticFeedback.isSupported()) {
          hapticFeedback.notificationOccurred("success");
        }
        setTimeout(() => {
          miniApp.close();
        }, 1000);
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

  return null;
}
