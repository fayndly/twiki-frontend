import styles from "./ButtonAppeal.module.scss";
import type { PropsButtonAppeal } from "../types";

import { ShieldAlert } from "lucide-react";
import { IconButton } from "@telegram-apps/telegram-ui";

import { supportHapticFeedback } from "@/shared/helpers";

export const ButtonAppeal = ({ onClick }: PropsButtonAppeal) => {
  return (
    <IconButton
      onClick={() => {
        supportHapticFeedback("soft");
        onClick();
      }}
      className={styles.button_appeal}
      mode="plain"
      size="s"
    >
      <ShieldAlert color="rgba(255, 255, 255, 0.7)" />
    </IconButton>
  );
};
