import { initialValues } from "../config";

import { useNavigate } from "react-router-dom";

import { FormProfile } from "@/widgets/forms/FormProfile";
import { useCities } from "@/app/store/useCities";
import { useProfile } from "@/app/store/useProfile/model";
import type { StoreItemCities } from "@/app/store/useCities/types";

const getInitialValues = (data: any, cities: StoreItemCities[] | undefined) => {
  if (data) {
    if (cities) {
      console.log(data.city);

      data.city = cities.find((value) => value.value === data.city) || "";
    }

    return data;
  }
  return initialValues;
};

export function FormProfileUpdate() {
  const {
    data: dataCities,
    isPending: isCitiesPending,
    isFetching: isCitiesFetching,
  } = useCities();
  const {
    data: dataProfile,
    isPending: isProfilePending,
    isFetching: isProfileFetching,
    profileMutations,
  } = useProfile();

  const navigate = useNavigate();

  const isDataLoading =
    (isCitiesPending && isCitiesFetching) ||
    (isProfilePending && isProfileFetching);

  return (
    <FormProfile
      initialValues={getInitialValues(dataProfile, dataCities)}
      handleSubmit={async (values) => {
        if (typeof values.city === "string") {
          return;
        }

        if (!values.photo) {
          return;
        }

        await profileMutations.mutateAsync({
          name: values.name,
          age: +values.age,
          description: values.description,
          sex: values.sex,
          photo: values.photo,
          cityId: values.city.value,
        });
      }}
      cities={dataCities || []}
      isDataLoading={isDataLoading}
      validateNoChanges={true}
      successActionFn={() => {
        navigate(-1);
      }}
    />
  );
}
