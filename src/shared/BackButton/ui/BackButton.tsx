import styles from "./BackButton.module.scss";
import {
  useIsVisibleBackButton,
  useIsTgBackButtonSupporting,
  useCheckBackButton,
} from "../store";
import {
  onPressBackButtonHandler,
  useTgBackButtonOnPressHandler,
  useVisibleBackButtonHook,
} from "../helpers";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  useCheckBackButton()();

  const isTgButtonSupportingBackButton = useIsTgBackButtonSupporting();
  const isVisibleBackButton = useIsVisibleBackButton();

  const canShowHTMLButton =
    !isTgButtonSupportingBackButton && isVisibleBackButton;

  useTgBackButtonOnPressHandler(navigate);
  useVisibleBackButtonHook(location);

  return (
    canShowHTMLButton && (
      <Button
        onClick={() => {
          onPressBackButtonHandler(navigate);
        }}
        className={styles.back_button}
        before={<ChevronLeft />}
        mode="gray"
        size="s"
      >
        Назад
      </Button>
    )
  );
}
