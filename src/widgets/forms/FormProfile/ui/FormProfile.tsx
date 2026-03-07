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
        errors={[
          errors.name && touched.name ? errors.name : "",
          errors.age && touched.age ? errors.age : "",
          errors.sex && touched.sex ? errors.sex : "",
        ]}
        subtitle="Заполните поля имени, возраста и пола"
        header="Имя, возраст, пол"
        showHeader={true}
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
        errors={[
          errors.description && touched.description ? errors.description : "",
        ]}
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
      <SectionInput
        errors={[errors.photo && touched.photo ? errors.photo : ""]}
        subtitle="Ваше фото"
        header="Фото*"
      >
        <InputImage
          onChange={() => {
            setFieldTouched("photo", true);
          }}
          hasErrors={Boolean(errors.photo?.length)}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.currentTarget.files?.[0];
            setFieldValue("photo", file);
          }}
          id="photo"
          name="photo"
          label="Выбрать фото"
          photoPreview={values.photo}
          clearValue={() => {
            setFieldValue("photo", undefined);
          }}
        />
      </SectionInput>
      <SectionInput
        errors={[errors.city && touched.city ? errors.city : ""]}
        subtitle="Выберите город из выпадающего списка"
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
          options={cities}
        />
      </SectionInput>
      <SubmitButton
        onSubmit={() => {
          submitEventHandler(formik, successActionFn);
        }}
      />
    </form>
  );
}
