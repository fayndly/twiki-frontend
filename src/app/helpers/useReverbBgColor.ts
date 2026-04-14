import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { miniApp, themeParams, useSignal } from "@tma.js/sdk-react";

import { paths } from "@/app/routes";

const pagesReverbBg = [
  paths.pageSettings,
  paths.pageProfileCardEdit,
  paths.pageProfileCardCreate,
  paths.pageFiltersEdit,
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
