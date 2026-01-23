import type { ButtonSubmitStatuses } from "../types";

import { hapticFeedback, mainButton } from "@tma.js/sdk-react";
import type { FormikErrors } from "formik";
import { useEffect } from "react";

import { useCloseAppelModal } from "@/widgets/AppealModal";
import { useCardIdAppelModal } from "@/widgets/AppealModal";
import { useViewingCards } from "@/pages/viewing/model";

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
      if (hapticFeedback.isSupported()) {
        hapticFeedback.impactOccurred("medium");
      }
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
          if (hapticFeedback.isSupported()) {
            hapticFeedback.notificationOccurred("success");
          }

          closeAppelModal();
        } else {
          throw new Error(result);
        }
      } catch (e) {
        console.log(e);

        setButtonStatus("error");
        if (hapticFeedback.isSupported()) {
          hapticFeedback.notificationOccurred("error");
        }
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
