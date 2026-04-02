import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { miniApp, themeParams, useSignal } from "@tma.js/sdk-react";

const pagesReverbBg = [
  "/settings",
  "/profile/update",
  "/profile/create",
  "/filters",
];

export const useReverbBgColor = () => {
  const location = useLocation();
  const signalIsDark = useSignal(themeParams.isDark);

  useEffect(() => {
    const isReverb = pagesReverbBg.includes(location.pathname);

    const secondaryBgColor = themeParams.secondaryBgColor() || "#fff";
    const bgColor = themeParams.bgColor() || "#fff";

    miniApp.setBgColor(isReverb ? secondaryBgColor : bgColor);
    miniApp.setHeaderColor(isReverb ? secondaryBgColor : bgColor);
  }, [location, signalIsDark]);
};
