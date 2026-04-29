import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLocation } from "react-router-dom";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { useEffect, useMemo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/app/store";
import { pathsToPublicSrc } from "@/app/config";
import { MainLayout } from "@/app/layouts/MainLayout";
import { AppRoutes, paths } from "@/app/routes";
import { preloadLottie, useReverbBgColor } from "@/app/helpers";
import { useSetInitDataRaw } from "@/app/api";
import {
  useIsFormFiltersDirty,
  useIsFormProfileUpdateDirty,
} from "@/app/store/useDirtyForms";
import type { PropsApp } from "@/app/types";
import { useGetPlatformForApp, useSetPlatform } from "@/app/store";

import { Navbar } from "@/widgets/Navbar";
import { SnackbarContainer } from "@/widgets/SnackbarContainer";
import { ModalAppeal } from "@/features/appeal-profile";

import { ButtonBack } from "@/shared/ui/buttons/ButtonBack";
import { ButtonSettings } from "@/shared/ui/buttons/ButtonSettings";

const pagesWithNavbar = new Set([
  paths.pageProfileCardsView,
  paths.pageLikesProfileCardsView,
  paths.pageSympathyProfileCardsView,
]);

export default function App({ launchParams }: PropsApp) {
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
        <ButtonBack
          isFormFiltersDirty={isFormFiltersDirty}
          isFormProfileUpdateDirty={isFormProfileUpdateDirty}
        />
        <ButtonSettings />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
        <ModalAppeal />
        <SnackbarContainer />
        <Navbar show={isNavbarPage} />
      </AppRoot>
    </QueryClientProvider>
  );
}
