import styles from "./index.module.scss";
import {
  useIsVisibleButtonBack,
  useIsTgButtonBackSupporting,
  useCheckButtonBack,
} from "../model";
import {
  navigationHandler,
  onPressButtonBackHandler,
  useTgButtonBackOnPressHandler,
  useVisibleButtonBackHook,
} from "../helpers";
import type { PropsButtonBack } from "../types";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function ButtonBack({
  isFormFiltersDirty,
  isFormProfileUpdateDirty,
}: PropsButtonBack) {
  const location = useLocation();
  const navigate = useNavigate();

  useCheckButtonBack()();

  const isTgButtonSupportingBackButton = useIsTgButtonBackSupporting();
  const isVisibleBackButton = useIsVisibleButtonBack();

  const canShowHTMLButton =
    !isTgButtonSupportingBackButton && isVisibleBackButton;

  useTgButtonBackOnPressHandler(async () => {
    await navigationHandler(
      location,
      navigate,
      isFormFiltersDirty,
      isFormProfileUpdateDirty,
    );
  });
  useVisibleButtonBackHook(location);

  return (
    canShowHTMLButton && (
      <Button
        onClick={() => {
          onPressButtonBackHandler(async () => {
            await navigationHandler(
              location,
              navigate,
              isFormFiltersDirty,
              isFormProfileUpdateDirty,
            );
          });
        }}
        className={styles.back_button}
        before={<ChevronLeft />}
        mode="gray"
        size="s"
      >
        Назад
      </Button>
    )
  );
}
