import styles from "./index.module.scss";

import { List } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/app/store";

export function ListSectionsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isBase = useIsBase();
  return (
    <List
      className={`${styles.list} ${isBase ? styles.list_wrapper_base : styles.list_wrapper}`}
    >
      {children}
    </List>
  );
}
