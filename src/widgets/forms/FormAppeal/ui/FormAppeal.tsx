import styles from "./FormAppeal.module.scss";
import { initialValues, validationSchema, typeOptions } from "../config";
import { handler } from "../helpers";
import { submit } from "../api";

import { useFormik } from "formik";

import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputTextarea } from "@/shared/inputs/InputTextarea";
import { SubmitButton, useButtonSubmitForFormic } from "@/shared/SubmitButton";
import {
  useCardIdAppealModal,
  useCloseAppealModal,
} from "@/widgets/AppealModal";
import { useViewingCards } from "@/pages/viewing/model";

export function FormAppeal() {
  const { viewingCardsMutations } = useViewingCards();
  const cardIdAppelModal = useCardIdAppealModal();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await submit(values, cardIdAppelModal, viewingCardsMutations.mutateAsync);
    },
  });

  useButtonSubmitForFormic(formik);

  const closeAppealModal = useCloseAppealModal();

  const { errors, values, handleChange, setFieldTouched, touched } = formik;

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      <InputSelect
        onChange={() => {
          setFieldTouched("type", true);
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
          errors.description && touched.description ? errors.description : ""
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
        subtitle="Подробнее опишите нарушение"
      />
      <SubmitButton
        type="html"
        onSubmit={() => {
          handler(formik, closeAppealModal);
        }}
      />
    </form>
  );
}
