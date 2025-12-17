import { AppRoot } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

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

const pagesWithNavbar = ["/viewing", "/likes", "/sympathy"];
const pagesReverbBg = ["/settings", "/profile/update"];

export default function App() {
  const theme = useGetTheme();
  const location = useLocation();

  const isNavbarShow = pagesWithNavbar.includes(location.pathname);
  const isReverbBgColor = pagesReverbBg.includes(location.pathname);

  return (
    <AppRoot appearance={theme}>
      <MainLayout reverbBgColor={isReverbBgColor && theme === "light"}>
        <AppRoutes />
      </MainLayout>
      <Navbar show={isNavbarShow} />
    </AppRoot>
  );
}
