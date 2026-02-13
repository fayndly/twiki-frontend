import styles from "./App.module.scss";
import { AppRoutes } from "../routes";
import { preloadLottie } from "../helpers";
import { useGetTheme, useReverbBgColor } from "../helpers";

import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLocation } from "react-router-dom";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { MainLayout } from "@/app/layouts/MainLayout";
import { queryClient } from "@/app/store";
import { Navbar } from "@/widgets/Navbar";
import { WarningSnackbarContainer } from "@/widgets/WarningSnackbar";
import { AppealModal } from "@/widgets/AppealModal";
import { BackButton } from "@/shared/BackButton";
import { SettingsButton } from "@/shared/SettingsButton";
import { pathsToPublicSrc } from "@/shared/config";

const pagesWithNavbar = ["/viewing", "/likes", "/sympathy"];

export default function App() {
  const location = useLocation();

  const isNavbarShow = pagesWithNavbar.includes(location.pathname);

  const theme = useGetTheme();

  useReverbBgColor(theme, location);

  const stickerPaths = Object.values(pathsToPublicSrc.stickers);

  useEffect(() => {
    Promise.all(stickerPaths.map(preloadLottie));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot className={styles.app_root} appearance={theme}>
        <BackButton />
        <SettingsButton />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
        <AppealModal />
        <WarningSnackbarContainer />
        <Navbar show={isNavbarShow} />
      </AppRoot>
    </QueryClientProvider>
  );
}
