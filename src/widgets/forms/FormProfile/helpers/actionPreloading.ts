import type { ProfileInitialValues } from "../types";

import type { FormikProps } from "formik";
import { popup } from "@tma.js/sdk-react";

import { paths } from "@/app/routes";

export const fnActionPreloading = async (
  formik: FormikProps<ProfileInitialValues>,
  pathname?: string,
) => {
  if (pathname !== paths.pageProfileCardEdit) {
    return;
  }

  const changes = {
    age: false,
    city: false,
  };

  if (
    typeof formik.values.city === "object" &&
    typeof formik.initialValues.city === "object"
  ) {
    const isCityChanged =
      formik.values.city.value !== formik.initialValues.city.value;

    if (isCityChanged) {
      const promise = popup.show({
        title: "Изменить город в фильтрах?",
        message:
          "Мы будем показывать анкеты по новым параметрам вашего города.",
        buttons: [
          { id: "ok_city", type: "ok" },
          { id: "cancel_city", type: "cancel" },
        ],
      });
      const buttonId = await promise;

      changes.city = buttonId === "ok_city";
    }
  }

  const isAgeChanged = formik.values.age !== formik.initialValues.age;

  if (isAgeChanged) {
    const promise = popup.show({
      title: "Изменить возраст в фильтрах?",
      message:
        "Мы будем показывать анкеты по новым параметрам вашего возраста.",
      buttons: [
        { id: "ok_age", type: "ok" },
        { id: "cancel_age", type: "cancel" },
      ],
    });
    const buttonId = await promise;

    changes.age = buttonId === "ok_age";
  }

  formik.setFieldValue("changes", changes);

  return changes;
};
