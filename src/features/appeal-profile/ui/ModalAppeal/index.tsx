import styles from "./index.module.scss";
import { useCloseAppealModal, useIsOpenAppealModal } from "../../model";
import { FormAppeal } from "../FormAppeal";

import { IconButton, Modal } from "@telegram-apps/telegram-ui";
import { X } from "lucide-react";

import { PlaceholderSticker } from "@/shared/ui/Placeholder";
import { pathsToPublicSrc } from "@/app/config";
import { useHideButtonSubmit } from "@/shared/ui/buttons/ButtonSubmit";
import { useGetPlatform } from "@/app/store";

export function ModalAppeal() {
  const IsOpen = useIsOpenAppealModal();
  const closeAppelModal = useCloseAppealModal();

  const hideButtonSubmit = useHideButtonSubmit();

  const platform = useGetPlatform();
  const isMobile = platform === "ios" || platform === "android";

  return (
    <Modal
      open={IsOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAppelModal();
          hideButtonSubmit();
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
