import { settingsButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import type { NavigateFunction, Location } from "react-router-dom";
import { settingsButtonPaths } from "../config";
import { useHideSettingsButton, useShowSettingsButton } from "../store";
import { supportHapticFeedback } from "@/shared/helpers/supportHapticFeedback";

export const onPressSettingsButtonHandler = (
  navigate: NavigateFunction,
  from: "tg" | "HTML" = "tg",
) => {
  from === "HTML" && supportHapticFeedback("light");
  navigate("/settings");
};

export const useTgSettingsButtonOnPressHandler = (
  navigate: NavigateFunction,
) => {
  const handler = () => {
    onPressSettingsButtonHandler(navigate);
  };
  useEffect(() => {
    settingsButton.onClick(handler);
    return () => {
      settingsButton.offClick(handler);
    };
  });
};

export const useVisibleSettingsButtonHook = (location: Location<any>) => {
  const showSettingsButton = useShowSettingsButton();
  const hideSettingsButton = useHideSettingsButton();

  useEffect(() => {
    !settingsButtonPaths.includes(location.pathname)
      ? showSettingsButton()
      : hideSettingsButton();
  }, [location]);
};
