import styles from "./BackButton.module.scss";
import {
  useIsVisibleBackButton,
  useIsTgButtonSupporting,
  useCheckBackButton,
} from "../store";
import {
  onPressBackButtonHandler,
  useTgBackButtonOnPressHandler,
  useVisibleBackButtonHook,
} from "../helpers";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";

export function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  useCheckBackButton()();

  const isTgButtonSupportingBackButton = useIsTgButtonSupporting();
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
        before={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        }
        mode="gray"
        size="s"
      >
        Назад
      </Button>
    )
  );
}
