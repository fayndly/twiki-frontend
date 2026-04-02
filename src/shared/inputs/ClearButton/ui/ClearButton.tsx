import { IconButton } from "@telegram-apps/telegram-ui";

import styles from "./ClearButton.module.scss";
import { X } from "lucide-react";

export function ClearButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      className={styles.icon_button}
      mode="gray"
      size="s"
      onClick={() => {
        onClick?.();
      }}
    >
      <X strokeWidth={2.5} size={12} className={styles.icon} />
    </IconButton>
  );
}
