import styles from "./index.module.scss";
import type { PropsSnackbar, PropsCustomSnackbar } from "../../types";

import { useEffect } from "react";
import { Text } from "@telegram-apps/telegram-ui";
import { X, CloudAlert, Ban, CircleCheck } from "lucide-react";
import { IconButton } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/app/store";

export function Snackbar({
  before,
  after,
  description,
  header,
  onClose,
  action,
  timeForDelete = 3000,
}: PropsSnackbar) {
  const isBase = useIsBase();

  useEffect(() => {
    const timer = setTimeout(onClose, timeForDelete);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.snackbar} ${isBase ? styles.snackbar_base : styles.snackbar_ios}`}
    >
      <div className={styles.info_container}>
        <div>{before}</div>

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

export function SnackbarError({ item, fnDeleteSnackbar }: PropsCustomSnackbar) {
  return (
    <Snackbar
      onClose={() => {
        fnDeleteSnackbar(item.id);
      }}
      before={
        item.type === "clientError" ? (
          <Ban size={28} color="var(--tgui--destructive_text_color)" />
        ) : (
          <CloudAlert size={28} color="var(--tgui--destructive_text_color)" />
        )
      }
      after={
        <IconButton
          mode="plain"
          size="s"
          onClick={() => {
            fnDeleteSnackbar(item.id);
          }}
        >
          <X />
        </IconButton>
      }
      header={item.header}
      description={item.description}
      // action={
      //   <Button
      //     mode="plain"
      //     size="s"
      //     style={{
      //       width: "minContent",
      //     }}
      //     onClick={async () => {
      //       if (item.retryFunction) {
      //         await item.retryFunction(...(item.args ?? []));
      //       }
      //       deleteWarningSnackbar(item.id);
      //     }}
      //   >
      //     Повторить
      //   </Button>
      // }
    />
  );
}

export function SnackbarConfirm({
  item,
  fnDeleteSnackbar,
}: PropsCustomSnackbar) {
  return (
    <Snackbar
      onClose={() => {
        fnDeleteSnackbar(item.id);
      }}
      before={<CircleCheck size={28} color="#1BCE13" />}
      after={
        <IconButton
          mode="plain"
          size="s"
          onClick={() => {
            fnDeleteSnackbar(item.id);
          }}
        >
          <X />
        </IconButton>
      }
      header={item.header}
      description={item.description}
      timeForDelete={2000}
    />
  );
}
