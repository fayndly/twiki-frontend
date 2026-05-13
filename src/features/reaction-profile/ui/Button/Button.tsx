import styles from "./Button.module.scss";
import type { PropsButton } from "../../types";

import { IconButton } from "@telegram-apps/telegram-ui";
import { DynamicIcon } from "lucide-react/dynamic";

import { supportHapticFeedback } from "@/shared/helpers";

export const Button = ({
  onClick,
  borderColor,
  iconName,
  iconColor,
}: PropsButton) => {
  return (
    <IconButton
      className={styles.button}
      onClick={() => {
        onClick?.();

        supportHapticFeedback("light");
      }}
      mode="outline"
      size="m"
      style={{
        borderColor,
      }}
    >
      <DynamicIcon
        size={42}
        name={iconName}
        color={iconColor}
        strokeWidth={2.4}
      />
    </IconButton>
  );
};
