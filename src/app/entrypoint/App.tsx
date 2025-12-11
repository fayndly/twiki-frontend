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

export default function App() {
  const theme = useGetTheme();
  const location = useLocation();

  useEffect(() => {
    // Google Analytics
    console.log(location);
  }, [location]);

  const isNavbarShow = location.pathname !== "/settings";

  return (
    <AppRoot appearance={theme}>
      <MainLayout reverbBgColor={!isNavbarShow && theme === "light"}>
        <AppRoutes />
      </MainLayout>
      <Navbar show={isNavbarShow} />
    </AppRoot>
  );
}
