import styles from "./FormAppeal.module.scss";
import { initialValues, validationSchema, typeOptions } from "../config";
import {
  formStateWatcher,
  useStatusValidateButton,
  useClickButton,
} from "../model";

import { useFormik } from "formik";

import { InputSelect } from "@/shared/inputs/InputSelect";
import { SectionLoaderForm } from "@/shared/SectionLoaderForm";
import { InputTextarea } from "@/shared/inputs/InputTextarea";

export function FormAppeal() {
  const isDataLoading = false;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => values,
  });

  formStateWatcher(
    isDataLoading,
    formik,
    useStatusValidateButton,
    useClickButton,
  );

  const { errors, values, handleChange, setFieldTouched, touched } = formik;
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
          <InputSelect
            onChange={() => {
              setFieldTouched("sex", true);
            }}
            errors={errors.type && touched.type ? errors.type : ""}
            handleChange={handleChange}
            value={values.type}
            id="type"
            name="type"
            header="Тип*"
            subtitle="Тип жалобы"
            options={typeOptions}
          />
          <InputTextarea
            errors={
              errors.description && touched.description
                ? errors.description
                : ""
            }
            onChange={() => {
              setFieldTouched("description", true);
            }}
            handleChange={handleChange}
            value={values.description}
            id="description"
            name="description"
            header="Описание"
            placeholder="Введите описание"
            subtitle="Ваше описание"
          />
        </form>
      )}
    </>
  );
}
