import {
  useSetStatusButtonSubmit,
  useStatusButtonSubmit,
  useTypeButtonSubmit,
  useHideButtonSubmit,
  useShowButtonSubmit,
} from "./useButtonSubmit.ts";

import type { FormikProps } from "formik";
import { useEffect } from "react";

import { useMobileKeyboard } from "@/shared/helpers";

export const useButtonSubmitForFormic = <T>(
  formic: FormikProps<T>,
  validateNoChanges: boolean = false,
  waitLoadFormData: boolean = false,
) => {
  const { isValid, isSubmitting, validateForm, dirty } = formic;

  const canStatusButtonBeValidate = isValid && !isSubmitting;

  const setStatusButtonSubmit = useSetStatusButtonSubmit();
  const statusButtonSubmit = useStatusButtonSubmit();

  useEffect(() => {
    validateForm();

    if (
      statusButtonSubmit !== "error" &&
      statusButtonSubmit !== "loading" &&
      statusButtonSubmit !== "success"
    ) {
      if (!dirty && validateNoChanges) {
        setStatusButtonSubmit("noChanges");
      } else {
        setStatusButtonSubmit(canStatusButtonBeValidate ? "valid" : "noValid");
      }
    }
  }, [canStatusButtonBeValidate, dirty]);

  const showSubmitButton = useShowButtonSubmit();
  const hideSubmitButton = useHideButtonSubmit();
  const typeSubmitButton = useTypeButtonSubmit();

  const isKeyboardOpen = useMobileKeyboard();

  useEffect(() => {
    if (isKeyboardOpen && typeSubmitButton !== "button") {
      hideSubmitButton();
    } else if (waitLoadFormData) {
      hideSubmitButton();
    } else {
      showSubmitButton();
    }
  }, [isKeyboardOpen, waitLoadFormData]);

  return null;
};
