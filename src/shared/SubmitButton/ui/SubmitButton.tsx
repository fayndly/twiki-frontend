import styles from "./SubmitButton.module.scss";
import type { PropsButtonDefault, PropsSubmitButton } from "../types";
import { getParams, useTgSubmitButtonOnPressHandler } from "../helpers";
import {
  useIsVisibleSubmitButton,
  useSetTypeSubmitButton,
  useStatusSubmitButton,
} from "../store";

import { Button } from "@telegram-apps/telegram-ui";
import { themeParams } from "@tma.js/sdk-react";

import { supportHapticFeedback } from "@/shared/helpers";

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

export function SubmitButton({ type, onSubmit }: PropsSubmitButton) {
  const isVisibleSubmitButton = useIsVisibleSubmitButton();
  const statusSubmitButton = useStatusSubmitButton();

  const params = getParams();
  const paramsFromStatus = params[statusSubmitButton];

  useSetTypeSubmitButton()(type);

  const onPressSubmitButtonHandler = () => {
    if (!paramsFromStatus.isEnabled) {
      return;
    }

    supportHapticFeedback("medium");
    onSubmit();
  };

  useTgSubmitButtonOnPressHandler(onPressSubmitButtonHandler);

  if (isVisibleSubmitButton) {
    if (type === "html") {
      return (
        <>
          <div className={styles.padding}></div>
          <div
            className={styles.button_container}
            style={{ backgroundColor: themeParams.headerBgColor() }}
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
