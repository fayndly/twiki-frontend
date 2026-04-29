import styles from "./MainLayout.module.scss";
import type { PropsMainLayout } from "../types";

import {
  useIsTgButtonSettingsSupporting,
  useIsVisibleButtonSettings,
} from "@/shared/ui/buttons/ButtonSettings";
import {
  useIsTgButtonBackSupporting,
  useIsVisibleButtonBack,
} from "@/shared/ui/buttons/ButtonBack";

export function MainLayout({ children }: PropsMainLayout) {
  const isTgButtonSettingsSupporting = useIsTgButtonSettingsSupporting();
  const isVisibleButtonSettings = useIsVisibleButtonSettings();

  const isTgButtonBackSupporting = useIsTgButtonBackSupporting();
  const isVisibleButtonBack = useIsVisibleButtonBack();

  const isShowTopPadding =
    (!isTgButtonSettingsSupporting && isVisibleButtonSettings) ||
    (!isTgButtonBackSupporting && isVisibleButtonBack);

  return (
    <main
      className={`${styles.main} ${isShowTopPadding && styles.no_supported_buttons}`}
    >
      {children}
    </main>
  );
}
