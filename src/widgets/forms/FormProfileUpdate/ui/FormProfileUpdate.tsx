import { initialValues } from "../config";
import { postProfileUpdate, useGetterData } from "../api";

import { useNavigate } from "react-router-dom";

import { FormProfile } from "@/widgets/forms/FormProfile";
import { useCities } from "@/app/store/useCities";

export function FormProfileUpdate() {
  const { data: dataCities, isPending: isCitiesPending } = useCities();

  const { dataProfile, isDataLoading } = useGetterData();

  const navigate = useNavigate();

  return (
    <FormProfile
      initialValues={dataProfile || initialValues}
      handleSubmit={postProfileUpdate}
      cities={dataCities || []}
      isDataLoading={isDataLoading && isCitiesPending}
      validateNoChanges={true}
      successActionFn={() => {
        navigate(-1);
      }}
    />
  );
}
