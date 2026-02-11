import style from "./AppealModal.module.scss";

import { Modal } from "@telegram-apps/telegram-ui";
import {
  useCloseAppealModal,
  useIsOpenAppealModal,
} from "../store/useAppelModal";
import { PlaceholderSticker } from "@/shared/Placeholder";
import { pathsToPublicSrc } from "@/shared/config";
import { FormAppeal } from "@/widgets/forms/FormAppeal";
import { mainButton } from "@tma.js/sdk-react";

export function AppealModal() {
  const IsOpen = useIsOpenAppealModal();
  const closeAppelModal = useCloseAppealModal();

  return (
    <Modal
      open={IsOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAppelModal();
          mainButton.hide();
        }
      }}
      header={<Modal.Header />}
    >
      <div className={style.modal_content}>
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
