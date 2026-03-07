import styles from "./FormProfile.module.scss";
import { validationSchema, sexOptions } from "../config";
import type { PropsFormProfile } from "../types";

import { useFormik } from "formik";

import { InputText } from "@/shared/inputs/InputText";
import { InputTextarea } from "@/shared/inputs/InputTextarea";
import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputImage } from "@/shared/inputs/InputImage";
import { InputSearchSelect } from "@/shared/inputs/InputSearchSelect";
import { SectionLoaderForm } from "@/shared/SectionLoaderForm";
import {
  SubmitButton,
  useButtonSubmitForFormic,
  submitEventHandler,
} from "@/shared/SubmitButton";
import { SectionErrorLoadFormData } from "@/shared/SectionErrorLoadFormData";
import { SectionInput } from "@/shared/SectionInput";

export function FormProfile({
  initialValues,
  handleSubmit,
  cities,
  isDataLoading,
  validateNoChanges,
  successActionFn,
  citiesActions,
  profileActions,
  showSubmitButton,
}: PropsFormProfile) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  useButtonSubmitForFormic(formik, validateNoChanges, showSubmitButton);

  const {
    errors,
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
  } = formik;

  if (isDataLoading) {
    return <SectionLoaderForm />;
  }

  if (citiesActions.isError || profileActions?.isError) {
    return (
      <SectionErrorLoadFormData
        onClick={async () => {
          if (citiesActions.isError) {
            await citiesActions.refetch();
          }
          if (profileActions?.isError) {
            await profileActions.refetch();
          }
        }}
        header="Ошибка загрузки данных"
        description="Не удалось загрузить данные анкеты, повторите попытку нажав на кнопку ниже или попробуйте позже"
      />
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      <SectionInput
        errors={errors.name && touched.name ? errors.name : ""}
        subtitle="Ваше имя"
        header="Имя*"
      >
        <InputText
          onChange={() => {
            setFieldTouched("name", true);
          }}
          hasError={Boolean(errors.name?.length)}
          handleChange={handleChange}
          value={values.name}
          type="text"
          id="name"
          name="name"
          placeholder="Введите имя"
          clickClear={() => {
            setFieldValue("name", "");
          }}
        />
      </SectionInput>
      <SectionInput
        errors={errors.age && touched.age ? errors.age : ""}
        subtitle="Ваш возраст"
        header="Возраст*"
      >
        <InputText
          onChange={() => {
            setFieldTouched("age", true);
          }}
          hasError={Boolean(errors.age?.length)}
          handleChange={handleChange}
          value={values.age}
          type="number"
          id="age"
          name="age"
          placeholder="Введите возраст"
        />
      </SectionInput>
      <SectionInput
        errors={
          errors.description && touched.description ? errors.description : ""
        }
        subtitle="Ваше описание"
        header="Описание"
      >
        <InputTextarea
          onChange={() => {
            setFieldTouched("description", true);
          }}
          handleChange={handleChange}
          value={values.description}
          id="description"
          name="description"
          placeholder="Введите описание"
        />
      </SectionInput>
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
      <SubmitButton
        onSubmit={() => {
          submitEventHandler(formik, successActionFn);
        }}
      />
    </form>
  );
}
