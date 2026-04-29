import { buttonBackPaths } from "../config";
import { useHideButtonBack, useShowButtonBack } from "../model";

import { backButton, popup } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { Location, NavigateFunction } from "react-router-dom";

import { paths } from "@/app/routes";
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

export const navigationHandler = async (
  location: Location,
  navigate: NavigateFunction,
  isFormFiltersDirty?: boolean,
  isFormProfileUpdateDirty?: boolean,
) => {
  if (
    (location.pathname === paths.pageFiltersEdit && isFormFiltersDirty) ||
    (location.pathname === paths.pageProfileCardEdit &&
      isFormProfileUpdateDirty)
  ) {
    const promise = popup.show({
      title: "Выйти без сохранения?",
      message: "Если уйти сейчас, изменения в анкете будут потеряны.",
      buttons: [
        { id: "stay", type: "default", text: "Остаться" },
        { id: "exit", type: "destructive", text: "Выйти" },
      ],
    });
    const buttonId = await promise;
    if (buttonId === "exit") {
      navigate(-1);
    }
  } else {
    navigate(-1);
  }
};
