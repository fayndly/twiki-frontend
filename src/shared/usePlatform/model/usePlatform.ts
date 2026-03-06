import type { InitialState, UsePlatform, PlatformState } from "../types";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: InitialState = {
  platform: undefined,
  platformForApp: undefined,
  isBase: undefined,
};

const platformState: UsePlatform = (set) => ({
  ...initialState,
  set: (platform) =>
    set(
      (state) => {
        if (!platform) {
          return;
        }

        const platforms = [
          "android",
          "ios",
          "macos",
          "tdesktop",
          "weba",
          "web",
        ] as const;

        type Platform = (typeof platforms)[number];

        function isPlatform(value: string): value is Platform {
          return platforms.includes(value as Platform);
        }

        if (isPlatform(platform)) {
          state.platform = platform;
        } else {
          state.platform = "android";
        }

        if (["ios", "macos"].includes(platform)) {
          state.isBase = false;
          state.platformForApp = "ios";
        } else {
          state.isBase = true;
          state.platformForApp = "base";
        }
      },
      false,
      "set",
    ),
});

const usePlatform = create<PlatformState>()(immer(devtools(platformState)));

export const useGetPlatform = () => usePlatform((state) => state.platform);
export const useGetPlatformForApp = () =>
  usePlatform((state) => state.platformForApp);
export const useIsBase = () => usePlatform((state) => state.isBase);
export const useSetPlatform = () => usePlatform.getState().set;
