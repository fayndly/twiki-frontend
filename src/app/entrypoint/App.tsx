import { AppRoot } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

import { themeParams, useSignal } from "@tma.js/sdk-react";

import { AppRoutes } from "../routes";

import { MainLayout } from "../layouts/MainLayout/index";
import { Navbar } from "@/widgets/Navbar";
import { useEffect, useState } from "react";

const getTheme = () => {
  const [theme, setTheme] = useState<undefined | "dark" | "light">(undefined);
  const isDark = useSignal(themeParams.isDark);

  useEffect(() => {
    isDark ? setTheme("dark") : setTheme("light");
  }, [isDark]);

  return theme;
};

export default function App() {
  return (
    <AppRoot appearance={getTheme()}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <Navbar />
    </AppRoot>
  );
}
