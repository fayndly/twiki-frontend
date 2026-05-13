import { mainButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

export const useTgButtonSubmitOnPressHandler = (handler: () => void) => {
  useEffect(() => {
    mainButton.onClick(handler);
    return () => {
      mainButton.offClick(handler);
    };
  });
};
