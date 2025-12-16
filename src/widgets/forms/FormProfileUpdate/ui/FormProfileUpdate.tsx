import styles from "./FormProfileUpdate.module.scss";
import { cities, initialValues, validationSchema } from "../config";
import { handleSubmit } from "../api";
import { FormStateWatcher } from "../model";

import { Formik } from "formik";

import { InputText } from "@/shared/inputs/InputText";
import { InputTextarea } from "@/shared/inputs/InputTextarea";
import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputFile } from "@/shared/inputs/InputFile";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";

export function FormProfileUpdate() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        values,
        handleChange,
        setFieldValue,
        setFieldTouched,
        touched,
      }) => (
        <>
          <FormStateWatcher />
          <form
            className={styles.form}
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <InputText
              onChange={() => {
                setFieldTouched("firstName", true);
              }}
              errors={
                errors.firstName && touched.firstName ? errors.firstName : ""
              }
              handleChange={handleChange}
              value={values.firstName}
              clickClear={() => {
                setFieldValue("firstName", "");
              }}
              type="text"
              id="firstName"
              name="firstName"
              header="Имя*"
              placeholder="Введите имя"
              subtitle="Ваше имя"
            />
            <InputText
              errors={errors.age && touched.age ? errors.age : ""}
              onChange={() => {
                setFieldTouched("age", true);
              }}
              handleChange={handleChange}
              value={values.age}
              type="number"
              id="age"
              name="age"
              header="Возраст*"
              placeholder="Введите возраст"
              subtitle="Ваш возраст"
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
              subtitle="Ваш пол"
              options={["Мужской", "Женский"]}
            />
            <InputFile
              onChange={() => {
                setFieldTouched("photo", true);
              }}
              errors={errors.photo && touched.photo ? errors.photo : ""}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.currentTarget.files?.[0];
                setFieldValue("photo", file);
              }}
              id="photo"
              name="photo"
              label="Выбрать фото"
              subtitle="Ваше фото"
              photoPreview={values.photo}
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
          </form>
        </>
      )}
    </Formik>
  );
}
