import styles from "./FormAppeal.module.scss";
import { initialValues, validationSchema, typeOptions } from "../config";
import { submit } from "../api";

import { useFormik } from "formik";

import { InputSelect } from "@/shared/inputs/InputSelect";
import { InputTextarea } from "@/shared/inputs/InputTextarea";
import {
  SubmitButton,
  useButtonSubmitForFormic,
  submitEventHandler,
} from "@/shared/SubmitButton";
import {
  useCardIdAppealModal,
  useCloseAppealModal,
  useFromAppealModal,
} from "@/widgets/AppealModal";
import { useViewingCards } from "@/pages/viewing/model";
import { useLikesCards } from "@/app/store/useLikesCards";

export function FormAppeal() {
  const { viewingCardsMutations } = useViewingCards();
  const { likesCardsMutations } = useLikesCards(false);
  const cardIdAppelModal = useCardIdAppealModal();
  const fromAppealModal = useFromAppealModal();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let mutateFn;
      console.log(fromAppealModal);
      if (fromAppealModal === "likesCards") {
        mutateFn = likesCardsMutations.mutateAsync;
      } else if (fromAppealModal === "viewingCards") {
        mutateFn = viewingCardsMutations.mutateAsync;
      } else {
        return Promise.reject(new Error("fromAppealModal is null"));
      }
      await submit(values, cardIdAppelModal, mutateFn);
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
          submitEventHandler(formik, closeAppealModal);
        }}
      />
    </form>
  );
}
