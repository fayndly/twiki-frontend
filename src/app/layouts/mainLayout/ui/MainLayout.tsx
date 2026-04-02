import styles from "./MainLayout.module.scss";
import type { PropsMainLayout } from "../types";

import {
  useIsTgSettingsButtonSupporting,
  useIsVisibleSettingsButton,
} from "@/shared/SettingsButton";
import {
  useIsTgBackButtonSupporting,
  useIsVisibleBackButton,
} from "@/shared/BackButton";

export function MainLayout({ children }: PropsMainLayout) {
  const isTgSettingsButtonSupporting = useIsTgSettingsButtonSupporting();
  const isVisibleSettingsButton = useIsVisibleSettingsButton();

  const isTgBackButtonSupporting = useIsTgBackButtonSupporting();
  const isVisibleBackButton = useIsVisibleBackButton();

  const isShowTopPadding =
    (!isTgSettingsButtonSupporting && isVisibleSettingsButton) ||
    (!isTgBackButtonSupporting && isVisibleBackButton);

  return (
    <main
      className={`${styles.main} ${isShowTopPadding && styles.no_supported_buttons}`}
    >
      {children}
    </main>
  );
}
