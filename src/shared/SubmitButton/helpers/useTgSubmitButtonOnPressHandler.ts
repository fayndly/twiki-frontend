import { mainButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

export const useTgSubmitButtonOnPressHandler = (handler: () => void) => {
  useEffect(() => {
    mainButton.onClick(handler);
    return () => {
      mainButton.offClick(handler);
    };
  });
};
