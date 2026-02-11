import { initialValues } from "../config";
import { postProfileUpdate, useGetterData } from "../api";

import { useNavigate } from "react-router-dom";

import { FormProfile } from "@/widgets/forms/FormProfile";

export function FormProfileUpdate() {
  const { cities, profileData, isDataLoading } = useGetterData();

  const navigate = useNavigate();

  return (
    <FormProfile
      initialValues={profileData || initialValues}
      handleSubmit={postProfileUpdate}
      cities={cities}
      isDataLoading={isDataLoading}
      validateNoChanges={true}
      successActionFn={() => {
        navigate(-1);
      }}
    />
  );
}
