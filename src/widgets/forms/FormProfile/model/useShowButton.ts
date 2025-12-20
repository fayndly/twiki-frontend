import { useMobileKeyboard } from "@/shared/helpers";

import { mainButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

export const useShowButton = (isDataLoading: boolean) => {
  const isKeyboardOpen = useMobileKeyboard();

  useEffect(() => {
    isKeyboardOpen || isDataLoading ? mainButton.hide() : mainButton.show();
  }, [isKeyboardOpen, isDataLoading]);
};
