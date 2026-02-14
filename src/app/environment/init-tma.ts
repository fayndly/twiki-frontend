import {
  setDebug,
  themeParams,
  initData,
  viewport,
  init as initSDK,
  mockTelegramEnv,
  type ThemeParams,
  retrieveLaunchParams,
  emitEvent,
  miniApp,
  swipeBehavior,
  settingsButton,
  backButton,
  mainButton,
} from "@tma.js/sdk-react";

import { config } from "./config";

export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  setDebug(options.debug);
  initSDK();

  if (options.mockForMacOS) {
    let firstThemeSent = false;
    mockTelegramEnv({
      onEvent(event, next) {
        if (event.name === "web_app_request_theme") {
          let tp: ThemeParams | {} = {};
          if (firstThemeSent) {
            tp = themeParams.state();
          } else {
            firstThemeSent = true;
            tp ||= retrieveLaunchParams().tgWebAppThemeParams;
          }
          return emitEvent("theme_changed", { theme_params: tp });
        }

        if (event.name === "web_app_request_safe_area") {
          return emitEvent("safe_area_changed", {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          });
        }

        next();
      },
    });
  }

  if (swipeBehavior.isSupported() && !config.isSwipeBehavior) {
    swipeBehavior.mount();

    swipeBehavior.disableVertical();

    document.body.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        const target = e.target;

        if (target instanceof Element) {
          if (!target.closest(".scrollable")) {
            e.preventDefault();
          }
        } else {
          e.preventDefault();
        }
      },
      { passive: false },
    );
  }

  initData.restore();

  if (mainButton.mount.isAvailable()) {
    mainButton.mount();
  }

  if (settingsButton.mount.isAvailable()) {
    settingsButton.mount();
  }

  if (backButton.mount.isAvailable()) {
    backButton.mount();
  }

  if (miniApp.mount.isAvailable()) {
    themeParams.mount();
    miniApp.mount();
    themeParams.bindCssVars();
  }

  if (viewport.mount.isAvailable()) {
    viewport.mount().then(() => {
      viewport.bindCssVars();
    });
  }
}
