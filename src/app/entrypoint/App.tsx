import { AppRoot } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

import { themeParams, useSignal } from "@tma.js/sdk-react";

import { AppRoutes } from "../routes";

import { MainLayout } from "../layouts/MainLayout/index";
import { Navbar } from "@/widgets/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useGetTheme = () => {
  const [theme, setTheme] = useState<undefined | "dark" | "light">(undefined);
  const isDark = useSignal(themeParams.isDark);

  useEffect(() => {
    isDark ? setTheme("dark") : setTheme("light");
  }, [isDark]);

  return theme;
};

const pagesWithNavbar = ["/viewing", "/likes", "/sympathy"];
const pagesReverbBg = ["/settings"];

export default function App() {
  const theme = useGetTheme();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

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
