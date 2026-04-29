import { initialValues } from "../model";
import { FormProfile } from "./FormProfile";
import type { ProfileInitialValues } from "../types";

import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { useCities } from "@/app/store/useCities";
import { useProfile } from "@/app/store/useProfile";
import type { StoreItemCities } from "@/app/store/useCities";

const getInitialValues = (
  data: ProfileInitialValues | undefined,
  cities: StoreItemCities[] | undefined,
) => {
  if (data) {
    const city =
      cities && typeof data.city === "string"
        ? cities.find((value) => value.value === data.city) || ""
        : data.city;

    return {
      ...data,
      city,
    };
  }
  return {
    ...initialValues,
    changes: {
      age: false,
      city: false,
    },
  };
};

export function FormProfileUpdate() {
  const {
    data: dataCities,
    isPending: isCitiesPending,
    isFetching: isCitiesFetching,
    isError: isCitiesError,
    refetch: refetchCities,
    isSuccess: isCitiesSuccess,
  } = useCities();
  const {
    data: dataProfile,
    isPending: isProfilePending,
    isFetching: isProfileFetching,
    isError: isProfileError,
    refetch: refetchProfile,
    isSuccess: isProfileSuccess,
    profileMutations,
  } = useProfile();

  const navigate = useNavigate();

  const isDataLoading =
    (isCitiesPending && isCitiesFetching) ||
    (isProfilePending && isProfileFetching);

  const initialValues = useMemo(
    () => getInitialValues(dataProfile, dataCities),
    [dataProfile, dataCities],
  );

  return (
    <FormProfile
      initialValues={initialValues}
      handleSubmit={async (values) => {
        if (typeof values.city === "string") {
          return;
        }

        if (!values.photo) {
          return;
        }

        if (!values.sex) {
          return;
        }

        await profileMutations.mutateAsync({
          name: values.name,
          age: +values.age,
          description: values.description,
          sex: values.sex,
          photo: values.photo,
          cityId: values.city.value,
          changes: values.changes,
        });
      }}
      cities={dataCities || []}
      isDataLoading={isDataLoading}
      validateNoChanges={true}
      successActionFn={() => {
        navigate(-1);
      }}
      citiesActions={{
        isError: isCitiesError,
        refetch: refetchCities,
        isSuccess: isCitiesSuccess,
      }}
      profileActions={{
        isError: isProfileError,
        refetch: refetchProfile,
        isSuccess: isProfileSuccess,
      }}
      showSubmitButton={isDataLoading || isCitiesError || isProfileError}
    />
  );
}
