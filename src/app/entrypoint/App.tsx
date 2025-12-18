import { AppRoot } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

import styles from "./App.module.scss";

import { themeParams, useSignal } from "@tma.js/sdk-react";

import { AppRoutes } from "../routes";

import { Navbar } from "@/widgets/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

const useGetTheme = () => {
  const [theme, setTheme] = useState<undefined | "dark" | "light">(undefined);
  const isDark = useSignal(themeParams.isDark);

  useEffect(() => {
    isDark ? setTheme("dark") : setTheme("light");
  }, [isDark]);

  return theme;
};

export function setReverseColors(colors: Record<string, string>) {
  const root = document.querySelector<HTMLElement>(`.${styles.app_root}`);

  if (!root) return;

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

const pagesWithNavbar = ["/viewing", "/likes", "/sympathy"];
const pagesReverbBg = [
  "/settings",
  "/profile/update",
  "/profile/create",
  "/filters",
];

export default function App() {
  const theme = useGetTheme();
  const location = useLocation();

  const isNavbarShow = pagesWithNavbar.includes(location.pathname);

  useEffect(() => {
    const isReverb = pagesReverbBg.includes(location.pathname);
    if (theme === "light") {
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
      setReverseColors({
        revers_bg_color: "var(--tgui--bg_color)",
        revers_secondary_bg_color: "var(--tgui--secondary_bg_color)",
      });
    }
  }, [location, theme]);

  return (
    <AppRoot className={styles.app_root} appearance={theme}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <Navbar show={isNavbarShow} />
    </AppRoot>
  );
}
