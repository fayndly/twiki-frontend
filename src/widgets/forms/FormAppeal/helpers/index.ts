import type { FormikProps } from "formik";
import {
  useHideSubmitButton,
  useSetStatusSubmitButton,
} from "@/shared/SubmitButton";

export async function handler<T>(
  formik: FormikProps<T>,
  successFn: () => void,
) {
  const setStatusSubmitButton = useSetStatusSubmitButton();

  const { isSubmitting, isValid, submitForm, validateForm } = formik;

  const canStatusButtonBeValidate = isValid && !isSubmitting;

  setStatusSubmitButton("loading");

  const errors = await validateForm();

  if (Object.keys(errors).length > 0) {
    setStatusSubmitButton("noValid");
    return;
  }

  try {
    await submitForm();

    setStatusSubmitButton("success");

    setTimeout(() => {
      successFn();
      useHideSubmitButton()();
      setStatusSubmitButton("void");
    }, 500);
  } catch (e) {
    console.log(e);

    setStatusSubmitButton("error");

    setTimeout(() => {
      setStatusSubmitButton(canStatusButtonBeValidate ? "valid" : "noValid");
    }, 500);
  }
}
