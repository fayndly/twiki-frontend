import { getInitialValues } from "../helpers";
import { validationSchema } from "../model";

import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useViewingCards } from "@/app/store/useProfileCards";
import { useSetFormDirty } from "@/app/store/useDirtyForms";
import { useCities } from "@/app/store/useCities";
import { useFilters } from "@/app/store/useFilters";
import { InputSelect } from "@/shared/ui/inputs/InputSelect";
import { InputSearchSelect } from "@/shared/ui/inputs/InputSearchSelect";
import { InputRange } from "@/shared/ui/inputs/InputRange";
import {
  ButtonSubmit,
  useButtonSubmitForFormic,
  submitEventHandler,
} from "@/shared/ui/buttons/ButtonSubmit";
import { SectionInput } from "@/shared/ui/sections/SectionInput";
import { ListSectionsWrapper } from "@/shared/ui/ListSectionsWrapper";
import { SectionFeedbackLoading } from "@/shared/ui/sections/SectionFeedbackLoading";
import { sexOptions } from "@/shared/consts";

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

  const initialValues = useMemo(() => {
    if (!isCitiesSuccess || !isFiltersSuccess) {
      return getInitialValues(dataFilters, dataCities);
    }

    return getInitialValues(dataFilters, dataCities);
  }, [isCitiesSuccess, isFiltersSuccess, dataFilters, dataCities]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (typeof values.city === "string") {
        return;
      }

      if (values.sex === "") {
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
      viewingCardsRefetch();
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
    return <SectionFeedbackLoading type="loadingFormData" />;
  }

  if (isCitiesError || isFiltersError) {
    return (
      <SectionFeedbackLoading
        type="errorLoadingFormData"
        header="Ошибка загрузки данных"
        description="Не удалось загрузить данные фильтров, повторите попытку нажав на кнопку ниже или попробуйте позже"
        onClickButtonReload={async () => {
          if (isCitiesError) {
            await refetchCities();
          }
          if (isFiltersError) {
            await refetchFilters();
          }
        }}
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
            hasErrors={Boolean(errors.sex?.length)}
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
      <ButtonSubmit
        onSubmit={() => {
          submitEventHandler(formik, () => {
            navigate(-1);
          });
        }}
      />
    </form>
  );
}
