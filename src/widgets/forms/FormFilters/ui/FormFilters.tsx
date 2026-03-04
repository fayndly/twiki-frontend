import styles from "./FormFilters.module.scss";
import { initialValues, validationSchema, sexOptions } from "../config";

import { useFormik } from "formik";

import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";
import { InputRange } from "@/shared/inputs/InputRange";
import { SectionLoaderForm } from "@/shared/SectionLoaderForm";
import {
  SubmitButton,
  useButtonSubmitForFormic,
  submitEventHandler,
} from "@/shared/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useCities } from "@/app/store/useCities";
import { useFilters } from "@/app/store/useFilters";
import type { StoreItemCities } from "@/app/store/useCities/types";

const getInitialValues = (
  data:
    | {
        ageMin: number;
        ageMax: number;
        sex: "male" | "female";
        city: string | StoreItemCities;
      }
    | undefined,
  cities: StoreItemCities[] | undefined,
) => {
  if (data) {
    if (cities) {
      data.city = cities.find((value) => value.value === data.city) || "";
    }
    return data;
  }
  return initialValues;
};

export function FormFilters() {
  const { data: dataCities, isPending: isCitiesPending } = useCities();
  const {
    data: dataFilters,
    isPending: isFiltersPending,
    filtersMutations,
  } = useFilters();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: getInitialValues(dataFilters, dataCities),
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
    },
  });

  useButtonSubmitForFormic(formik, true, isFiltersPending && isCitiesPending);

  const {
    errors,
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
  } = formik;

  return (
    <>
      {isFiltersPending && isCitiesPending ? (
        <SectionLoaderForm />
      ) : (
        <form
          className={styles.form}
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <InputRange
            setFieldTouched={setFieldTouched}
            firstValue={values.ageMin}
            lastValue={values.ageMax}
            handleChange={handleChange}
            id={{ first: "ageMin", last: "ageMax" }}
            name={{ first: "ageMin", last: "ageMax" }}
            header={{ first: "От*", last: "До*" }}
            placeholder={{
              first: "Введите возраст",
              last: "Введите возраст",
            }}
            subtitle="Максимальный и минимальный возраст"
            errors={{
              first: errors.ageMin && touched.ageMin ? errors.ageMin : "",
              last: errors.ageMax && touched.ageMax ? errors.ageMax : "",
            }}
          />
          <InputSelect
            onChange={() => {
              setFieldTouched("sex", true);
            }}
            errors={errors.sex && touched.sex ? errors.sex : ""}
            handleChange={handleChange}
            value={values.sex}
            id="sex"
            name="sex"
            header="Пол*"
            subtitle="Пол собеседника"
            options={sexOptions}
          />
          <InputSearchSelect
            onChange={() => {
              setFieldTouched("city", true);
            }}
            errors={errors.city && touched.city ? errors.city : ""}
            handleChange={handleChange}
            value={values.city}
            clickClear={() => {
              setFieldValue("city", "");
            }}
            type="text"
            id="city"
            name="city"
            header="Город*"
            placeholder="Введите название города"
            subtitle="Выберите город из выпадающего списка"
            handleChangeClue={(value) => {
              setFieldValue("city", value);
            }}
            options={dataCities || []}
          />
          <SubmitButton
            onSubmit={() => {
              submitEventHandler(formik, () => {
                navigate(-1);
              });
            }}
          />
        </form>
      )}
    </>
  );
}
