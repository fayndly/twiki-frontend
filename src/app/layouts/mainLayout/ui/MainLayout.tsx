import styles from "./MainLayout.module.scss";

import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  reverbBgColor?: boolean;
};

export function MainLayout({ children, reverbBgColor = false }: Props) {
  return (
    <main
      className={`${styles.main} ${reverbBgColor && styles.reverb_bg_color}`}
    >
      {children}
    </main>
  );
}
