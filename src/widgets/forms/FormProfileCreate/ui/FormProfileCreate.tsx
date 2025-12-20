import { getParamsButton, initialValues } from "../config";
import { postProfileCreate, useGetterData } from "../api";
import { useClickButton, useStatusValidateButton } from "../model";

import { FormProfile } from "@/widgets/forms/FormProfile";

export function FormProfileCreate() {
  const { cities, isDataLoading } = useGetterData();

  return (
    <FormProfile
      initialValues={initialValues}
      handleSubmit={postProfileCreate}
      cities={cities}
      isDataLoading={isDataLoading}
      useStatusValidateButton={useStatusValidateButton}
      useClickButton={useClickButton}
      getParamsButton={getParamsButton}
    />
  );
}
