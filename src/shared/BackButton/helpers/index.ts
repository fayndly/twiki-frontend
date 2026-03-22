import { backButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { Location } from "react-router-dom";
import { backButtonPaths } from "../config";
import { useHideBackButton, useShowBackButton } from "../store";
import { supportHapticFeedback } from "@/shared/helpers";

export const onPressBackButtonHandler = async (fn: () => Promise<void>) => {
  supportHapticFeedback("light");
  fn?.();
};

export const useTgBackButtonOnPressHandler = (fn: () => Promise<void>) => {
  const handler = () => {
    onPressBackButtonHandler(fn);
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
