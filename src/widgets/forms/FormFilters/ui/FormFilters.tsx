import { initialValues, validationSchema, sexOptions } from "../config";
import type { FiltersInitialValues } from "../types";

import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";
import { InputRange } from "@/shared/inputs/InputRange";
import { SectionLoaderForm } from "@/shared/SectionLoaderForm";
import {
  SubmitButton,
  useButtonSubmitForFormic,
  submitEventHandler,
} from "@/shared/SubmitButton";
import { useCities } from "@/app/store/useCities";
import { useFilters } from "@/app/store/useFilters";
import type { StoreItemCities } from "@/app/store/useCities/types";
import { SectionErrorLoadFormData } from "@/shared/SectionErrorLoadFormData";
import { SectionInput } from "@/shared/SectionInput";
import { ListSectionsWrapper } from "@/shared/ListSectionsWrapper";
import { useViewingCards } from "@/app/store/useViewingCards";
import { useSetFormDirty } from "@/app/store/useDirtyForms";

const getInitialValues = (
  data: FiltersInitialValues | undefined,
  cities: StoreItemCities[] | undefined,
) => {
  if (data) {
    if (cities && typeof data.city === "string") {
      data.city = cities.find((value) => value.value === data.city) || "";
    }
    return data;
  }
  return initialValues;
};

export function FormFilters() {
  const {
    data: dataCities,
    isPending: isCitiesPending,
    isFetching: isCitiesFetching,
    isError: isCitiesError,
    refetch: refetchCities,
    isSuccess: isCitiesSuccess,
  } = useCities();
  const {
    data: dataFilters,
    isPending: isFiltersPending,
    isFetching: isFiltersFetching,
    isError: isFiltersError,
    refetch: refetchFilters,
    isSuccess: isFiltersSuccess,
    filtersMutations,
  } = useFilters();

  const setFormDirty = useSetFormDirty();

  const { refetch: viewingCardsRefetch } = useViewingCards();

  const navigate = useNavigate();

  let initialValues = getInitialValues(dataFilters, dataCities);

  useEffect(() => {
    initialValues = getInitialValues(dataFilters, dataCities);
  }, [isCitiesSuccess, isFiltersSuccess]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (typeof values.city === "string") {
        return;
      }

      await filtersMutations.mutateAsync({
        age: {
          min: +values.ageMin,
          max: +values.ageMax,
        },
        sex: values.sex,
        cityId: values.city.value,
      });
      await viewingCardsRefetch();
    },
  });

  const isDataLoading =
    (isCitiesPending && isCitiesFetching) ||
    (isFiltersPending && isFiltersFetching);

  useButtonSubmitForFormic(
    formik,
    true,
    isDataLoading || isCitiesError || isFiltersError,
  );

  const {
    errors,
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    dirty,
  } = formik;

  useEffect(() => {
    setFormDirty("filters", dirty);
  }, [dirty]);

  if (isDataLoading) {
    return <SectionLoaderForm />;
  }

  if (isCitiesError || isFiltersError) {
    return (
      <SectionErrorLoadFormData
        onClick={async () => {
          if (isCitiesError) {
            await refetchCities();
          }
          if (isFiltersError) {
            await refetchFilters();
          }
        }}
        header="Ошибка загрузки данных"
        description="Не удалось загрузить данные фильтров, повторите попытку нажав на кнопку ниже или попробуйте позже"
      />
    );
  }

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <ListSectionsWrapper>
        <InputRange
          setFieldTouched={setFieldTouched}
          firstValue={values.ageMin}
          lastValue={values.ageMax}
          handleChange={handleChange}
          id={{ first: "ageMin", last: "ageMax" }}
          name={{ first: "ageMin", last: "ageMax" }}
          header="Возраст собеседника"
          placeholder={{
            first: "От",
            last: "До",
          }}
          subtitle="Укажите возрастной диапазон для показа анкет."
          errors={{
            first: errors.ageMin && touched.ageMin ? errors.ageMin : "",
            last: errors.ageMax && touched.ageMax ? errors.ageMax : "",
          }}
        />
        <SectionInput
          errors={[errors.sex && touched.sex ? errors.sex : ""]}
          subtitle="Выберите пол людей, которых хотите видеть."
          header="Пол*"
        >
          <InputSelect
            onChange={() => {
              setFieldTouched("sex", true);
            }}
            hasError={Boolean(errors.sex?.length)}
            handleChange={handleChange}
            value={values.sex}
            id="sex"
            name="sex"
            options={sexOptions}
          />
        </SectionInput>

        <SectionInput
          errors={[errors.city && touched.city ? errors.city : ""]}
          subtitle="Мы покажем анкеты из выбранного города. Выберите из выпадающего списка."
          header="Город*"
        >
          <InputSearchSelect
            onChange={() => {
              setFieldTouched("city", true);
            }}
            hasErrors={Boolean(errors.city?.length)}
            handleChange={handleChange}
            value={values.city}
            clickClear={() => {
              setFieldValue("city", "");
            }}
            type="text"
            id="city"
            name="city"
            placeholder="Введите название города"
            handleChangeClue={(value) => {
              setFieldValue("city", value);
            }}
            options={dataCities || []}
          />
        </SectionInput>
      </ListSectionsWrapper>
      <SubmitButton
        onSubmit={() => {
          submitEventHandler(formik, () => {
            navigate(-1);
          });
        }}
      />
    </form>
  );
}
