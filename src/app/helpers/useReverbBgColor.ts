import { useEffect } from "react";
import styles from "../entrypoint/App.module.scss";
import type { Location } from "react-router-dom";
import { miniApp, themeParams } from "@tma.js/sdk-react";

const pagesReverbBg = [
  "/settings",
  "/profile/update",
  "/profile/create",
  "/filters",
];

export function setReverseColors(colors: Record<string, string>) {
  const root = document.querySelector<HTMLElement>(`.${styles.app_root}`);

  if (!root) return;

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

export const useReverbBgColor = (
  theme: "dark" | "light" | undefined,
  location: Location<any>,
) => {
  useEffect(() => {
    if (theme === "light") {
      const isReverb = pagesReverbBg.includes(location.pathname);
      const secondaryBgColor = themeParams.secondaryBgColor() || "#fff";
      const bgColor = themeParams.bgColor() || "#fff";
      miniApp.setBgColor(isReverb ? secondaryBgColor : bgColor);
      miniApp.setHeaderColor(isReverb ? "secondary_bg_color" : "bg_color");
      setReverseColors({
        revers_bg_color: isReverb
          ? "var(--tgui--secondary_bg_color)"
          : "var(--tgui--bg_color)",
        revers_secondary_bg_color: isReverb
          ? "var(--tgui--bg_color)"
          : "var(--tgui--secondary_bg_color)",
      });
    }

    if (theme === "dark") {
      const bgColor = themeParams.bgColor() || "#fff";
      miniApp.setBgColor(bgColor);
      miniApp.setHeaderColor("bg_color");
      setReverseColors({
        revers_bg_color: "var(--tgui--bg_color)",
        revers_secondary_bg_color: "var(--tgui--secondary_bg_color)",
      });
    }
  }, [location, theme]);
};
