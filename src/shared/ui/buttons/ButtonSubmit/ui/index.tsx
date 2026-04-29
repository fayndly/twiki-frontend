import styles from "./index.module.scss";
import type { PropsButtonSubmit } from "../types";
import { getParams } from "../helpers";
import {
  useHideButtonSubmit,
  useIsVisibleButtonSubmit,
  useSetTypeButtonSubmit,
  useStatusButtonSubmit,
  useTgButtonSubmitOnPressHandler,
} from "../model";
import { ButtonDefault } from "./ButtonDefault";

import { themeParams } from "@tma.js/sdk-react";
import { useEffect } from "react";

import { supportHapticFeedback } from "@/shared/helpers";

export function ButtonSubmit({ type = "tg", onSubmit }: PropsButtonSubmit) {
  const isVisibleButtonSubmit = useIsVisibleButtonSubmit();
  const statusButtonSubmit = useStatusButtonSubmit();

  const params = getParams();
  const paramsFromStatus = params[statusButtonSubmit];

  const setTypeButtonSubmit = useSetTypeButtonSubmit();

  useEffect(() => {
    setTypeButtonSubmit(type);
  }, [type, setTypeButtonSubmit]);

  const onPressButtonSubmitHandler = () => {
    if (!paramsFromStatus.isEnabled) {
      return;
    }

    supportHapticFeedback("medium");
    onSubmit();
  };

  useTgButtonSubmitOnPressHandler(onPressButtonSubmitHandler);

  const hideButtonSubmit = useHideButtonSubmit();

  useEffect(() => {
    return () => {
      hideButtonSubmit();
    };
  }, []);

  if (isVisibleButtonSubmit) {
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
              onClick={onPressButtonSubmitHandler}
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
          onClick={onPressButtonSubmitHandler}
          text={paramsFromStatus.text}
        />
      );
    }
  }
}
