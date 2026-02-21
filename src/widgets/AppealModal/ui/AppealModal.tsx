import styles from "./AppealModal.module.scss";

import { Modal } from "@telegram-apps/telegram-ui";
import {
  useCloseAppealModal,
  useIsOpenAppealModal,
} from "../store/useAppelModal";
import { PlaceholderSticker } from "@/shared/Placeholder";
import { pathsToPublicSrc } from "@/shared/config";
import { FormAppeal } from "@/widgets/forms/FormAppeal";
import { useHideSubmitButton } from "@/shared/SubmitButton";

export function AppealModal() {
  const IsOpen = useIsOpenAppealModal();
  const closeAppelModal = useCloseAppealModal();

  const hideSubmitButton = useHideSubmitButton();

  return (
    <Modal
      open={IsOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAppelModal();
          hideSubmitButton();
        }
      }}
      header={<Modal.Header />}
    >
      <div className={`${styles.modal_content} scrollable`}>
        <PlaceholderSticker
          header="Пожаловаться на анкету"
          description="Пожалуйста, укажите причину жалобы. Мы рассмотрим её и примем меры, если анкета нарушает правила сервиса."
          pathToSticker={pathsToPublicSrc.stickers.appeal}
        />
        <FormAppeal />
      </div>
    </Modal>
  );
}
