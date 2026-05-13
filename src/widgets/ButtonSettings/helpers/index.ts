import { settingsButtonPaths } from "../config";
import { useHideButtonSettings, useShowButtonSettings } from "../model";

import { settingsButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { NavigateFunction, Location } from "react-router-dom";

import { supportHapticFeedback } from "@/shared/helpers";

export const onPressButtonSettingsHandler = (
  navigate: NavigateFunction,
  from: "tg" | "HTML" = "tg",
) => {
  if (from === "HTML") {
    supportHapticFeedback("light");
  }
  navigate("/settings");
};

export const useTgButtonSettingsOnPressHandler = (
  navigate: NavigateFunction,
) => {
  const handler = () => {
    onPressButtonSettingsHandler(navigate);
  };
  useEffect(() => {
    settingsButton.onClick(handler);
    return () => {
      settingsButton.offClick(handler);
    };
  });
};

export const useVisibleButtonSettingsHook = (location: Location) => {
  const showButtonSettings = useShowButtonSettings();
  const hideButtonSettings = useHideButtonSettings();

  useEffect(() => {
    return !settingsButtonPaths.includes(location.pathname)
      ? showButtonSettings()
      : hideButtonSettings();
  }, [location]);
};
