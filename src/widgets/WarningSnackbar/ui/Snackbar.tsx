import { useEffect } from "react";
import type { PropsSnackbar } from "../types";
import styles from "./Snackbar.module.scss";
import { Text } from "@telegram-apps/telegram-ui";

export function Snackbar({
  before,
  after,
  description,
  header,
  onClose,
}: PropsSnackbar) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={styles.snackbar}>
      <div>{before}</div>
      <div className={styles.title_container}>
        <Text className={styles.header} weight="2">
          {header}
        </Text>
        <Text className={styles.description} weight="3">
          {description}
        </Text>
      </div>
      <div>{after}</div>
    </div>
  );
}
