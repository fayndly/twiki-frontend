import {
  useHideButtonSubmit,
  useSetStatusButtonSubmit,
} from "../../ButtonSubmit";

import type { FormikProps } from "formik";

export const submitEventHandler = async <T>(
  formik: FormikProps<T>,
  successFn: () => void,
  fnActionPreloading?: () => Promise<any>,
  fnRefetchFilters?: () => Promise<any>,
  fnRefetchViewingCards?: () => Promise<any>,
) => {
  const setStatusButtonSubmit = useSetStatusButtonSubmit();
  const hideButtonSubmit = useHideButtonSubmit();

  const { isSubmitting, isValid, submitForm, validateForm } = formik;

  const canStatusButtonBeValidate = isValid && !isSubmitting;

  const changes = await fnActionPreloading?.();

  setStatusButtonSubmit("loading");

  const errors = await validateForm();

  if (Object.keys(errors).length > 0) {
    setStatusButtonSubmit("noValid");
    return;
  }

  try {
    await submitForm();

    if (changes?.age || changes?.city) {
      fnRefetchFilters?.();
      fnRefetchViewingCards?.();
    }

    setStatusButtonSubmit("success");

    setTimeout(() => {
      successFn();
      hideButtonSubmit();
      setStatusButtonSubmit("void");
    }, 500);
  } catch (error) {
    console.log(error);

    setStatusButtonSubmit("error");

    setTimeout(() => {
      setStatusButtonSubmit(canStatusButtonBeValidate ? "valid" : "noValid");
    }, 500);
  }
};
