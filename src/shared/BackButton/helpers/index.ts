import { backButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { NavigateFunction, Location } from "react-router-dom";
import { backButtonPaths } from "../config";
import { useHideBackButton, useShowBackButton } from "../store";
import { supportHapticFeedback } from "@/shared/helpers";

export const onPressBackButtonHandler = (navigate: NavigateFunction) => {
  supportHapticFeedback("light");
  navigate(-1);
};

export const useTgBackButtonOnPressHandler = (navigate: NavigateFunction) => {
  const handler = () => {
    onPressBackButtonHandler(navigate);
  };
  useEffect(() => {
    backButton.onClick(handler);
    return () => {
      backButton.offClick(handler);
    };
  });
};

export const useVisibleBackButtonHook = (location: Location<any>) => {
  const showBackButton = useShowBackButton();
  const hideBackButton = useHideBackButton();

  useEffect(() => {
    backButtonPaths.includes(location.pathname)
      ? showBackButton()
      : hideBackButton();
  }, [location]);
};
