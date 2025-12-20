import { getParamsButton, initialValues } from "../config";
import { postProfileUpdate, useGetterData } from "../api";
import { useClickButton, useStatusValidateButton } from "../model";

import { FormProfile } from "@/widgets/forms/FormProfile";

export function FormProfileUpdate() {
  const { cities, profileData, isDataLoading } = useGetterData();

  return (
    <FormProfile
      initialValues={profileData || initialValues}
      handleSubmit={postProfileUpdate}
      cities={cities}
      isDataLoading={isDataLoading}
      useStatusValidateButton={useStatusValidateButton}
      useClickButton={useClickButton}
      getParamsButton={getParamsButton}
    />
  );
}
