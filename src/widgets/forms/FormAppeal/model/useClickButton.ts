import type { ButtonSubmitStatuses } from "../types";

import { mainButton } from "@tma.js/sdk-react";
import type { FormikErrors } from "formik";
import { useEffect } from "react";

import { useCloseAppelModal } from "@/widgets/AppealModal";
import { useCardIdAppelModal } from "@/widgets/AppealModal";
import { useViewingCards } from "@/pages/viewing/model";
import { supportHapticFeedback } from "@/shared/helpers";

export const useClickButton = (
  setButtonStatus: React.Dispatch<React.SetStateAction<ButtonSubmitStatuses>>,
  validateForm: () => Promise<FormikErrors<any>>,
  submitForm: () => Promise<any>,
  canShowButton: boolean,
  isSubmitting: boolean,
) => {
  const closeAppelModal = useCloseAppelModal();
  const { viewingCardsMutations } = useViewingCards();
  const cardIdAppelModal = useCardIdAppelModal();

  useEffect(() => {
    const handler = async () => {
      supportHapticFeedback("medium");
      setButtonStatus("loading");
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setButtonStatus("noValid");
        return;
      }

      try {
        const result = await submitForm();

        if (result) {
          if (!cardIdAppelModal) {
            return Promise.reject(new Error("cardId is missing"));
          }

          await viewingCardsMutations.mutateAsync({
            reaction: "appeal",
            cardId: cardIdAppelModal,
            appealData: result,
          });

          setButtonStatus("success");
          supportHapticFeedback("success");

          closeAppelModal();
        } else {
          throw new Error(result);
        }
      } catch (e) {
        console.log(e);

        setButtonStatus("error");
        supportHapticFeedback("error");

        setTimeout(() => {
          setButtonStatus(canShowButton ? "valid" : "noValid");
        }, 2000);
      }
    };

    mainButton.onClick(handler);

    return () => {
      mainButton.offClick(handler);
    };
  }, [submitForm, validateForm, isSubmitting]);
};
