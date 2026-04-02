import styles from "./SubmitButton.module.scss";
import type { PropsButtonDefault, PropsSubmitButton } from "../types";
import { getParams, useTgSubmitButtonOnPressHandler } from "../helpers";
import {
  useHideSubmitButton,
  useIsVisibleSubmitButton,
  useSetTypeSubmitButton,
  useStatusSubmitButton,
} from "../store";

import { Button } from "@telegram-apps/telegram-ui";
import { themeParams } from "@tma.js/sdk-react";

import { supportHapticFeedback } from "@/shared/helpers";
import { useEffect } from "react";

function ButtonDefault({
  isLoading,
  backgroundColor,
  color,
  onClick,
  text,
}: PropsButtonDefault) {
  return (
    <Button
      loading={isLoading}
      mode="filled"
      size="l"
      stretched
      style={{
        backgroundColor,
        color,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export function SubmitButton({ type = "tg", onSubmit }: PropsSubmitButton) {
  const isVisibleSubmitButton = useIsVisibleSubmitButton();
  const statusSubmitButton = useStatusSubmitButton();

  const params = getParams();
  const paramsFromStatus = params[statusSubmitButton];

  const setTypeSubmitButton = useSetTypeSubmitButton();

  useEffect(() => {
    setTypeSubmitButton(type);
  }, [type, setTypeSubmitButton]);

  const onPressSubmitButtonHandler = () => {
    if (!paramsFromStatus.isEnabled) {
      return;
    }

    supportHapticFeedback("medium");
    onSubmit();
  };

  useTgSubmitButtonOnPressHandler(onPressSubmitButtonHandler);

  const hideSubmitButton = useHideSubmitButton();

  useEffect(() => {
    return () => {
      hideSubmitButton();
    };
  }, []);

  if (isVisibleSubmitButton) {
    if (type === "html") {
      return (
        <>
          <div className={styles.padding}></div>
          <div
            className={styles.button_container}
            style={{ backgroundColor: themeParams.bottomBarBgColor() }}
          >
            <ButtonDefault
              isLoading={paramsFromStatus.isLoaderVisible}
              backgroundColor={paramsFromStatus.bgColor}
              color={paramsFromStatus.textColor}
              onClick={onPressSubmitButtonHandler}
              text={paramsFromStatus.text}
            />
          </div>
        </>
      );
    }

    if (type === "button") {
      return (
        <ButtonDefault
          isLoading={paramsFromStatus.isLoaderVisible}
          backgroundColor={paramsFromStatus.bgColor}
          color={paramsFromStatus.textColor}
          onClick={onPressSubmitButtonHandler}
          text={paramsFromStatus.text}
        />
      );
    }
  }
}
