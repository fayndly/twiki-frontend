import styles from "./FormProfile.module.scss";
import { validationSchema } from "../config";
import type { PropsFormProfile } from "../types";

import { Formik } from "formik";

import { InputText } from "@/shared/inputs/InputText";
import { InputTextarea } from "@/shared/inputs/InputTextarea";
import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputImage } from "@/shared/inputs/InputImage";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";

const sexOptions = [
  {
    value: "male",
    label: "Мужской",
  },
  {
    value: "female",
    label: "Женский",
  },
];

export function FormProfile({
  initialValues,
  handleSubmit,
  formStateWatcher,
  cities,
}: PropsFormProfile) {
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
          {formStateWatcher}
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
              options={sexOptions}
            />
            <InputImage
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
              clearValue={() => {
                setFieldValue("photo", undefined);
              }}
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
