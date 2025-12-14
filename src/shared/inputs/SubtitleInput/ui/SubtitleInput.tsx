import { type IPropsInputSubtitle } from "../types/index.types";
import styles from "./SubtitleInput.module.scss";

import { Text } from "@telegram-apps/telegram-ui";

export function SubtitleInput({ errors, subtitle }: IPropsInputSubtitle) {
  return (
    <div className={styles.subtitle_input}>
      {errors ? (
        <Text weight="3" className={styles.subtitle_input_error}>
          {errors}
        </Text>
      ) : (
        <Text weight="3" className={styles.subtitle_input_title}>
          {subtitle}
        </Text>
      )}
    </div>
  );
}
