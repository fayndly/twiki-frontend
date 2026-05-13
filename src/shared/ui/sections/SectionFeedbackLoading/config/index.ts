import type { ObjectsSectionFeedback } from "../types";

import { pathsToPublicSrc } from "@/app/config";

export const pathsToStickers: ObjectsSectionFeedback = {
  loadingCards: pathsToPublicSrc.stickers.loadingCarts,
  loadingFormData: undefined,
  errorLoadingCards: pathsToPublicSrc.stickers.error,
  errorLoadingFormData: undefined,
  noContent: pathsToPublicSrc.stickers.noContent,
};
