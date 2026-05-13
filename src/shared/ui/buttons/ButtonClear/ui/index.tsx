import styles from "./index.module.scss";

import { IconButton } from "@telegram-apps/telegram-ui";
import { X } from "lucide-react";

export function ButtonClear({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      type="button"
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
