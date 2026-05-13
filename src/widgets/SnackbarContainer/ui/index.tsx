import styles from "./index.module.scss";
import { useDeleteSnackbar, useContainerSnackbar } from "../model";
import { SnackbarError, SnackbarConfirm } from "./Snackbar";

import { AnimatePresence, motion } from "framer-motion";

export function SnackbarContainer() {
  const snackbarContainer = useContainerSnackbar();
  const deleteSnackbar = useDeleteSnackbar();

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
              <SnackbarError item={item} fnDeleteSnackbar={deleteSnackbar} />
            )}
            {item.type === "confirm" && (
              <SnackbarConfirm item={item} fnDeleteSnackbar={deleteSnackbar} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
