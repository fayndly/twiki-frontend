import { Button, IconButton } from "@telegram-apps/telegram-ui";
import {
  useDeleteWarningSnackbar,
  useContainerWarningSnackbar,
} from "../store/useWarningSnackbar";
import { AnimatePresence, motion } from "framer-motion";

import { Snackbar } from "./Snackbar";
import styles from "./WarningSnackbarContainer.module.scss";

export function WarningSnackbarContainer() {
  const deleteWarningSnackbar = useDeleteWarningSnackbar();
  const containerWarningSnackbar = useContainerWarningSnackbar();

  return (
    <div className={styles.warning_snackbar_container}>
      <AnimatePresence>
        {containerWarningSnackbar.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Snackbar
              onClose={() => {
                deleteWarningSnackbar(item.id);
              }}
              before={
                <IconButton
                  mode="plain"
                  size="s"
                  onClick={() => deleteWarningSnackbar(item.id)}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      opacity=".5"
                      fill="var(--tgui--link_color)"
                      clip-path="url(#close_a)"
                    >
                      <path
                        d="M12 24c6.5647 0 12-5.4471 12-12 0-6.56471-5.4471-12-12.0118-12C5.43529 0 0 5.43529 0 12c0 6.5529 5.44705 12 12 12Z"
                        fill-opacity=".04"
                      ></path>
                      <path
                        d="M7.86242 17.1429c-.56394 0-1.00528-.4542-1.00528-1.0187 0-.2701.09807-.5279.29422-.7121L10.5472 12 7.15136 8.60006c-.19615-.19637-.29422-.44187-.29422-.71189 0-.57689.44134-1.00648 1.00528-1.00648.28196 0 .50263.09819.69878.28231l3.4204 3.4122 3.4449-3.42448c.2084-.20866.4291-.29458.6988-.29458.5639 0 1.0176.44187 1.0176 1.00648 0 .28231-.0859.50324-.3066.72417L13.4282 12l3.3959 3.4c.2084.1841.3065.4417.3065.7242 0 .5645-.4536 1.0187-1.0298 1.0187-.282 0-.5395-.0982-.7234-.2947l-3.3958-3.4121-3.38363 3.4121c-.19613.1965-.45359.2947-.73555.2947Z"
                        fill-opacity=".8"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="close_a">
                        <path fill="#fff" d="M0 0h24v24H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </IconButton>
              }
              after={
                <Button
                  mode="plain"
                  size="s"
                  onClick={async () => {
                    if (item.retryFunction) {
                      await item.retryFunction(...(item.args ?? []));
                    }
                    deleteWarningSnackbar(item.id);
                  }}
                >
                  Повторить
                </Button>
              }
              description={item.description}
              header={item.header}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
