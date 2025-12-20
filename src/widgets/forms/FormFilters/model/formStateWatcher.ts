import { useShowButton } from "./useShowButton.ts";
import { useParamsButton } from "./useParamsButton.ts";

import type { FormikErrors, FormikProps } from "formik";
import type { ButtonSubmitStatuses } from "../types";
import { useState } from "react";
import { getParamsButton } from "../config/index.ts";

export const formStateWatcher = (
  isDataLoading: boolean,
  formic: FormikProps<any>,
  useStatusValidateButton: (
    buttonStatus: ButtonSubmitStatuses,
    setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
    canStatusButtonBeValidate: boolean
  ) => void,
  useClickButton: (
    setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
    validateForm: () => Promise<FormikErrors<any>>,
    submitForm: () => Promise<any>,
    canShowButton: boolean,
    isSubmitting: boolean
  ) => void
) => {
  const { isValid, isSubmitting, submitForm, validateForm } = formic;

  const canStatusButtonBeValidate = isValid && !isSubmitting;

  const [buttonStatus, setButtonStatus] =
    useState<ButtonSubmitStatuses>("noValid");

  useParamsButton(getParamsButton, buttonStatus);

  useStatusValidateButton(
    buttonStatus,
    setButtonStatus,
    canStatusButtonBeValidate
  );

  useShowButton(isDataLoading);

  useClickButton(
    setButtonStatus,
    validateForm,
    submitForm,
    canStatusButtonBeValidate,
    isSubmitting
  );

  return null;
};
