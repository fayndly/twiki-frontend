import { initialValues } from "../config";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { FormProfile } from "@/widgets/forms/FormProfile";
import { useCities } from "@/app/store/useCities";
import { useProfile } from "@/app/store/useProfile/model";
import type { StoreItemCities } from "@/app/store/useCities/types";
import type { ProfileInitialValues } from "@/widgets/forms/FormProfile";

const getInitialValues = (
  data: ProfileInitialValues | undefined,
  cities: StoreItemCities[] | undefined,
) => {
  if (data) {
    if (cities && typeof data.city === "string") {
      data.city = cities.find((value) => value.value === data.city) || "";
    }

    return data;
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

  let initialValues = getInitialValues(dataProfile, dataCities);

  useEffect(() => {
    initialValues = getInitialValues(dataProfile, dataCities);
  }, [isCitiesSuccess, isProfileSuccess]);

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
