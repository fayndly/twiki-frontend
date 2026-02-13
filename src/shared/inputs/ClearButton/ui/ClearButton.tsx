import { Tappable } from "@telegram-apps/telegram-ui";
import type { IPropsClearButton } from "../../InputSearchSelect/types/index.types";

import styles from "./ClearButton.module.scss";
import { X } from "lucide-react";

export function ClearButton({ onClick }: IPropsClearButton) {
  return (
    <Tappable
      className={styles.tappable}
      Component="div"
      style={{
        display: "flex",
      }}
      onClick={onClick}
    >
      <X strokeWidth={2.5} size={20} className={styles.icon} />
    </Tappable>
  );
}
