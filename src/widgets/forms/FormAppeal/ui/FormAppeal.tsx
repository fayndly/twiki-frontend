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
import { ListSectionsWrapper } from "@/shared/ListSectionsWrapper";
import { SectionInput } from "@/shared/SectionInput";

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
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <ListSectionsWrapper>
        <SectionInput
          errors={[errors.type && touched.type ? errors.type : ""]}
          subtitle="Пожалуйся сучило"
          header="Причина жалобы"
        >
          <InputSelect
            onChange={() => {
              setFieldTouched("type", true);
            }}
            hasError={Boolean(errors.type?.length)}
            handleChange={handleChange}
            value={values.type}
            id="type"
            name="type"
            options={typeOptions}
          />
        </SectionInput>
        <SectionInput
          errors={[
            errors.description && touched.description ? errors.description : "",
          ]}
          subtitle="Подробнее опишите нарушение"
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
      </ListSectionsWrapper>
      <SubmitButton
        type="html"
        onSubmit={() => {
          submitEventHandler(formik, closeAppealModal);
        }}
      />
    </form>
  );
}
