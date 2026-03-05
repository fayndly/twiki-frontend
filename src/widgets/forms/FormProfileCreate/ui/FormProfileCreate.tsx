import { initialValues } from "../config";
import { postProfileCreate } from "../api";

import { FormProfile } from "@/widgets/forms/FormProfile";

import { miniApp } from "@tma.js/sdk-react";
import { useCities } from "@/app/store/useCities";

export function FormProfileCreate() {
  const {
    data: dataCities,
    isPending: isCitiesPending,
    isFetching: isCitiesFetching,
  } = useCities();

  return (
    <FormProfile
      initialValues={initialValues}
      handleSubmit={postProfileCreate}
      cities={dataCities || []}
      isDataLoading={isCitiesPending && isCitiesFetching}
      validateNoChanges={false}
      successActionFn={() => {
        miniApp.close();
      }}
    />
  );
}
