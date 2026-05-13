import { initialValues } from "../model";
import { postProfileCreate } from "../api";
import { FormProfile } from "./FormProfile";

import { miniApp } from "@tma.js/sdk-react";

import { useCities } from "@/app/store/useCities";

export function FormProfileCreate() {
  const {
    data: dataCities,
    isPending: isCitiesPending,
    isFetching: isCitiesFetching,
    isError: isCitiesError,
    refetch: refetchCities,
    isSuccess: isCitiesSuccess,
  } = useCities();

  const isDataLoading = isCitiesPending && isCitiesFetching;

  return (
    <FormProfile
      initialValues={initialValues}
      handleSubmit={postProfileCreate}
      cities={dataCities || []}
      isDataLoading={isDataLoading}
      validateNoChanges={false}
      successActionFn={() => {
        miniApp.close();
      }}
      citiesActions={{
        isError: isCitiesError,
        refetch: refetchCities,
        isSuccess: isCitiesSuccess,
      }}
      showSubmitButton={isDataLoading || isCitiesError}
    />
  );
}
