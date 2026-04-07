import styles from "./AppealModal.module.scss";

import { IconButton, Modal } from "@telegram-apps/telegram-ui";
import {
  useCloseAppealModal,
  useIsOpenAppealModal,
} from "../store/useAppelModal";
import { PlaceholderSticker } from "@/shared/Placeholder";
import { pathsToPublicSrc } from "@/shared/config";
import { FormAppeal } from "@/widgets/forms/FormAppeal";
import { useHideSubmitButton } from "@/shared/SubmitButton";
import { X } from "lucide-react";
import { useGetPlatform } from "@/shared/usePlatform";

export function AppealModal() {
  const IsOpen = useIsOpenAppealModal();
  const closeAppelModal = useCloseAppealModal();

  const hideSubmitButton = useHideSubmitButton();

  const platform = useGetPlatform();
  const isMobile = platform === "ios" || platform === "android";

  return (
    <Modal
      open={IsOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAppelModal();
          hideSubmitButton();
        }
      }}
      header={
        <Modal.Header
          className={`${styles.modal_header} ${isMobile ? styles.modal_header_mobile : ""}`}
          after={
            !isMobile && (
              <IconButton mode="gray" size="s" onClick={closeAppelModal}>
                <X strokeWidth={3} size={18} color="var(--tgui--hint_color)" />
              </IconButton>
            )
          }
        />
      }
      className={styles.modal}
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
