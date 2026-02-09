import { backButton, hapticFeedback } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { NavigateFunction, Location } from "react-router-dom";
import { backButtonPaths } from "../config";
import { useHideBackButton, useShowBackButton } from "../store";

export const onPressBackButtonHandler = (navigate: NavigateFunction) => {
  hapticFeedback.isSupported() && hapticFeedback.impactOccurred("medium");
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
