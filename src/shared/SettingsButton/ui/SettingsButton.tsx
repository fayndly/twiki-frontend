import styles from "./SettingsButton.module.scss";
import {
  useIsVisibleSettingsButton,
  useIsTgSettingsButtonSupporting,
  useCheckSettingsButton,
} from "../store";
import {
  onPressSettingsButtonHandler,
  useTgSettingsButtonOnPressHandler,
  useVisibleSettingsButtonHook,
} from "../helpers";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export function SettingsButton() {
  const location = useLocation();
  const navigate = useNavigate();

  useCheckSettingsButton()();

  const isTgButtonSupportingSettingsButton = useIsTgSettingsButtonSupporting();
  const isVisibleSettingsButton = useIsVisibleSettingsButton();

  const canShowHTMLButton =
    !isTgButtonSupportingSettingsButton && isVisibleSettingsButton;

  useTgSettingsButtonOnPressHandler(navigate);
  useVisibleSettingsButtonHook(location);

  return (
    canShowHTMLButton && (
      <Button
        onClick={() => {
          onPressSettingsButtonHandler(navigate, "HTML");
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
