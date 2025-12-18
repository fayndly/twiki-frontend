import styles from "./MainLayout.module.scss";

import { type ReactNode } from "react";

type PropsMainLayout = {
  children: ReactNode;
};

export function MainLayout({ children }: PropsMainLayout) {
  return <main className={styles.main}>{children}</main>;
}
