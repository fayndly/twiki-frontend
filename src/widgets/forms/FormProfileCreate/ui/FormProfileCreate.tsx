import { initialValues } from "../config";
import { postProfileCreate, useGetterData } from "../api";

import { FormProfile } from "@/widgets/forms/FormProfile";

import { miniApp } from "@tma.js/sdk-react";

export function FormProfileCreate() {
  const { cities, isDataLoading } = useGetterData();

  return (
    <FormProfile
      initialValues={initialValues}
      handleSubmit={postProfileCreate}
      cities={cities}
      isDataLoading={isDataLoading}
      validateNoChanges={false}
      successActionFn={() => {
        miniApp.close();
      }}
    />
  );
}
