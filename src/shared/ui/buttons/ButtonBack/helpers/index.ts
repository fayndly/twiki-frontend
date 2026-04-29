import { buttonBackPaths } from "../config";
import { useHideButtonBack, useShowButtonBack } from "../model";

import { backButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { Location } from "react-router-dom";

import { supportHapticFeedback } from "@/shared/helpers";

export const onPressButtonBackHandler = async (fn: () => Promise<void>) => {
  supportHapticFeedback("light");
  fn?.();
};

export const useTgButtonBackOnPressHandler = (fn: () => Promise<void>) => {
  const handler = () => {
    onPressButtonBackHandler(fn);
  };
  useEffect(() => {
    backButton.onClick(handler);
    return () => {
      backButton.offClick(handler);
    };
  });
};

export const useVisibleButtonBackHook = (location: Location) => {
  const showButtonBack = useShowButtonBack();
  const hideButtonBack = useHideButtonBack();

  useEffect(() => {
    return buttonBackPaths.includes(location.pathname)
      ? showButtonBack()
      : hideButtonBack();
  }, [location]);
};
