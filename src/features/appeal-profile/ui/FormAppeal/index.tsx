import { initialValues, optionsType } from "../../config";
import { validationSchema } from "../../model";
import { submit } from "../../api";
import {
  useCardIdAppealModal,
  useCloseAppealModal,
  useFromAppealModal,
} from "../../model";

import { useFormik } from "formik";

import { useViewingCards } from "@/app/store/useProfileCards";
import { useLikesCards } from "@/app/store/useProfileCards";
import { InputSelect } from "@/shared/ui/inputs/InputSelect";
import { InputTextarea } from "@/shared/ui/inputs/InputTextarea";
import {
  ButtonSubmit,
  useButtonSubmitForFormic,
  submitEventHandler,
} from "@/shared/ui/buttons/ButtonSubmit";
import { ListSectionsWrapper } from "@/shared/ui/ListSectionsWrapper";
import { SectionInput } from "@/shared/ui/sections/SectionInput";

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
        return Promise.reject(new Error("formAppealModal is null"));
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
          subtitle="Укажите причину жалобы, чтобы мы могли проверить анкету"
          header="Причина жалобы"
        >
          <InputSelect
            onChange={() => {
              setFieldTouched("type", true);
            }}
            hasErrors={Boolean(errors.type?.length)}
            handleChange={handleChange}
            value={values.type}
            id="type"
            name="type"
            options={optionsType}
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
            placeholder="Введите подробное описание жалобы"
          />
        </SectionInput>
      </ListSectionsWrapper>
      <ButtonSubmit
        type="html"
        onSubmit={() => {
          submitEventHandler(formik, closeAppealModal);
        }}
      />
    </form>
  );
}
