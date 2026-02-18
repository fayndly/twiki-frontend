import styles from "./FormFilters.module.scss";
import { initialValues, validationSchema, sexOptions } from "../config";
import { postFiltersUpdate, useGetterData } from "../api";

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

export function FormFilters() {
  const navigate = useNavigate();
  const { cities, profileData, isDataLoading } = useGetterData();

  const formik = useFormik({
    initialValues: profileData || initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: postFiltersUpdate,
  });

  useButtonSubmitForFormic(formik, true, isDataLoading);

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
      {isDataLoading ? (
        <SectionLoaderForm />
      ) : (
        <form
          className={styles.form}
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <InputRange
            setFieldTouched={setFieldTouched}
            firstValue={values.firstAge}
            lastValue={values.lastAge}
            handleChange={handleChange}
            id={{ first: "firstAge", last: "lastAge" }}
            name={{ first: "firstAge", last: "lastAge" }}
            header={{ first: "От*", last: "До*" }}
            placeholder={{
              first: "Введите возраст",
              last: "Введите возраст",
            }}
            subtitle="Максимальный и минимальный возраст"
            errors={{
              first: errors.firstAge && touched.firstAge ? errors.firstAge : "",
              last: errors.lastAge && touched.lastAge ? errors.lastAge : "",
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
            options={cities}
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
