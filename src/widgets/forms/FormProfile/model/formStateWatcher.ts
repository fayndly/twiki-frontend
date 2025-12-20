import { useShowButton } from "./useShowButton.ts";
import { useParamsButton } from "./useParamsButton.ts";

import type { FormikErrors, FormikProps } from "formik";
import type { ButtonSubmitStatuses } from "../types";
import { useEffect, useState } from "react";

export const formStateWatcher = (
  isDataLoading: boolean,
  formic: FormikProps<any>,
  useStatusValidateButton: (
    buttonStatus: ButtonSubmitStatuses,
    setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
    canStatusButtonBeValidate: boolean,
    validateForm: () => Promise<FormikErrors<any>>,
    dirty?: boolean
  ) => void,
  useClickButton: (
    setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
    validateForm: () => Promise<FormikErrors<any>>,
    submitForm: () => Promise<any>,
    canShowButton: boolean,
    isSubmitting: boolean
  ) => void,
  getParamsButton: () => any
) => {
  const { isValid, isSubmitting, submitForm, validateForm, dirty } = formic;

  const canStatusButtonBeValidate = isValid && !isSubmitting;

  const [buttonStatus, setButtonStatus] =
    useState<ButtonSubmitStatuses>("noValid");

  useParamsButton(getParamsButton, buttonStatus);

  useStatusValidateButton(
    buttonStatus,
    setButtonStatus,
    canStatusButtonBeValidate,
    validateForm,
    dirty
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
