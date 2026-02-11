import type { FormikProps } from "formik";
import {
  useSetStatusSubmitButton,
  useStatusSubmitButton,
  useTypeSubmitButton,
} from "@/shared/SubmitButton";

import { useMobileKeyboard } from "@/shared/helpers";

import { useEffect } from "react";

import {
  useHideSubmitButton,
  useShowSubmitButton,
} from "@/shared/SubmitButton";

export const useButtonSubmitForFormic = <T>(
  formic: FormikProps<T>,
  validateNoChanges: boolean = false,
  waitLoadFormData: boolean = false,
) => {
  const { isValid, isSubmitting, validateForm, dirty } = formic;

  const canStatusButtonBeValidate = isValid && !isSubmitting;

  const setStatusSubmitButton = useSetStatusSubmitButton();
  const statusSubmitButton = useStatusSubmitButton();

  useEffect(() => {
    validateForm();

    if (
      statusSubmitButton !== "error" &&
      statusSubmitButton !== "loading" &&
      statusSubmitButton !== "success"
    ) {
      if (!dirty && validateNoChanges) {
        setStatusSubmitButton("noChanges");
      } else {
        setStatusSubmitButton(canStatusButtonBeValidate ? "valid" : "noValid");
      }
    }
  }, [canStatusButtonBeValidate, dirty]);

  const showSubmitButton = useShowSubmitButton();
  const hideSubmitButton = useHideSubmitButton();
  const typeSubmitButton = useTypeSubmitButton();

  const isKeyboardOpen = useMobileKeyboard();

  useEffect(() => {
    (isKeyboardOpen && typeSubmitButton === "tg") || waitLoadFormData
      ? hideSubmitButton()
      : showSubmitButton();
  }, [isKeyboardOpen, waitLoadFormData]);

  return null;
};
