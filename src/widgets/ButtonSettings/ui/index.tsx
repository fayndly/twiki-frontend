import styles from "./index.module.scss";
import {
  useIsVisibleButtonSettings,
  useIsTgButtonSettingsSupporting,
  useCheckButtonSettings,
} from "../model";
import {
  onPressButtonSettingsHandler,
  useTgButtonSettingsOnPressHandler,
  useVisibleButtonSettingsHook,
} from "../helpers";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export function ButtonSettings() {
  const location = useLocation();
  const navigate = useNavigate();

  useCheckButtonSettings()();

  const isTgButtonSupportingButtonSettings = useIsTgButtonSettingsSupporting();
  const isVisibleButtonSettings = useIsVisibleButtonSettings();

  const canShowHTMLButton =
    !isTgButtonSupportingButtonSettings && isVisibleButtonSettings;

  useTgButtonSettingsOnPressHandler(navigate);
  useVisibleButtonSettingsHook(location);

  return (
    canShowHTMLButton && (
      <Button
        onClick={() => {
          onPressButtonSettingsHandler(navigate, "HTML");
        }}
        className={styles.settings_button}
        before={<Settings />}
        mode="gray"
        size="s"
      >
        Настройки
      </Button>
    )
  );
}
