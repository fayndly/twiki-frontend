import styles from "./SnackbarContainer.module.scss";
import type { SnackbarItem } from "../types";
import { useDeleteSnackbar, useContainerSnackbar } from "../store/useSnackbar";
import { Snackbar } from "./Snackbar";

import { AnimatePresence, motion } from "framer-motion";
import { X, CloudAlert, Ban } from "lucide-react";
import { IconButton } from "@telegram-apps/telegram-ui";

const SnackbarError = ({ item }: { item: SnackbarItem }) => {
  const deleteWarningSnackbar = useDeleteSnackbar();

  return (
    <Snackbar
      onClose={() => {
        deleteWarningSnackbar(item.id);
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
            console.log("click");

            deleteWarningSnackbar(item.id);
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
};

export function SnackbarContainer() {
  const snackbarContainer = useContainerSnackbar();

  return (
    <div className={styles.snackbar_container}>
      <AnimatePresence>
        {snackbarContainer.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {(item.type === "serverError" || item.type === "clientError") && (
              <SnackbarError item={item} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
