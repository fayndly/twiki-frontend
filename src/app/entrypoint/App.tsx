import { AppRoutes, paths } from "../routes";
import { preloadLottie } from "../helpers";
import { useReverbBgColor } from "../helpers";
import { useSetInitDataRaw } from "../api/entrypoint.api";
import {
  useIsFormFiltersDirty,
  useIsFormProfileUpdateDirty,
} from "../store/useDirtyForms";

import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLocation } from "react-router-dom";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { useEffect, useMemo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { MainLayout } from "@/app/layouts/MainLayout";
import { queryClient } from "@/app/store";
import { Navbar } from "@/widgets/Navbar";
import { SnackbarContainer } from "@/widgets/SnackbarContainer";
import { AppealModal } from "@/widgets/AppealModal";
import { BackButton } from "@/shared/BackButton";
import { SettingsButton } from "@/shared/SettingsButton";
import { pathsToPublicSrc } from "@/shared/config";
import { useGetPlatformForApp, useSetPlatform } from "@/shared/usePlatform";

const pagesWithNavbar = new Set([
  paths.pageProfileCardsView,
  paths.pageLikesProfileCardsView,
  paths.pageSympathyProfileCardsView,
]);

export default function App({ launchParams }: { launchParams: any }) {
  const setPlatform = useSetPlatform();
  const platformForApp = useGetPlatformForApp();

  const isFormFiltersDirty = useIsFormFiltersDirty();
  const isFormProfileUpdateDirty = useIsFormProfileUpdateDirty();

  const location = useLocation();

  useReverbBgColor();

  useSetInitDataRaw();

  const isNavbarPage = pagesWithNavbar.has(location.pathname);

  const stickerPaths = useMemo(
    () => Object.values(pathsToPublicSrc.stickers),
    [],
  );

  useEffect(() => {
    Promise.all(stickerPaths.map(preloadLottie));
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    setPlatform(launchParams.tgWebAppPlatform);
    // setPlatform("android");
  }, [launchParams.tgWebAppPlatform]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot platform={platformForApp ?? "base"}>
        <BackButton
          isFormFiltersDirty={isFormFiltersDirty}
          isFormProfileUpdateDirty={isFormProfileUpdateDirty}
        />
        <SettingsButton />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
        <AppealModal />
        <SnackbarContainer />
        <Navbar show={isNavbarPage} />
      </AppRoot>
    </QueryClientProvider>
  );
}
