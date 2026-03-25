import styles from "./Snackbar.module.scss";
import type { PropsSnackbar } from "../types";

import { useEffect } from "react";
import { Text } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/shared/usePlatform";

export function Snackbar({
  before,
  after,
  description,
  header,
  onClose,
  action,
}: PropsSnackbar) {
  const isBase = useIsBase();

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.snackbar} ${isBase ? styles.snackbar_base : styles.snackbar_ios}`}
    >
      <div className={styles.info_container}>
        {before}

        <div className={styles.title_container}>
          <Text className={styles.header} weight="2">
            {header}
          </Text>
          <Text className={styles.description} weight="3">
            {description}
          </Text>
          {action}
        </div>
      </div>
      {after}
    </div>
  );
}
