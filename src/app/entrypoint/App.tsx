import { AppRoot } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

import styles from "./App.module.scss";
import { AppRoutes } from "../routes";

import { MainLayout } from "@/app/layouts/MainLayout";
import { queryClient } from "@/app/store";
import { Navbar } from "@/widgets/Navbar";

import { useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { WarningSnackbarContainer } from "@/widgets/WarningSnackbar";
import { AppealModal } from "@/widgets/AppealModal";
import { BackButton } from "@/shared/BackButton";
import { SettingsButton } from "@/shared/SettingsButton";
import { useGetTheme, useReverbBgColor } from "../helpers";

const pagesWithNavbar = ["/viewing", "/likes", "/sympathy"];

export default function App() {
  const location = useLocation();

  const isNavbarShow = pagesWithNavbar.includes(location.pathname);

  const theme = useGetTheme();

  useReverbBgColor(theme, location);

  // platform={"ios"}
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot className={styles.app_root} appearance={theme}>
        <BackButton />
        <SettingsButton />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
        <AppealModal></AppealModal>
        <WarningSnackbarContainer />
        <Navbar show={isNavbarShow} />
      </AppRoot>
    </QueryClientProvider>
  );
}
