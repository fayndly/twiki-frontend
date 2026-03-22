import styles from "./BackButton.module.scss";
import {
  useIsVisibleBackButton,
  useIsTgBackButtonSupporting,
  useCheckBackButton,
} from "../store";
import {
  onPressBackButtonHandler,
  useTgBackButtonOnPressHandler,
  useVisibleBackButtonHook,
} from "../helpers";
import type { PropsBackButton } from "../types";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { NavigateFunction, Location } from "react-router-dom";

import { popup } from "@tma.js/sdk";

const navigationHandler = async (
  location: Location,
  navigate: NavigateFunction,
  isFormFiltersDirty?: boolean,
  isFormProfileUpdateDirty?: boolean,
) => {
  console.log(location.pathname);
  console.log(isFormFiltersDirty);
  if (
    (location.pathname === "/filters" && isFormFiltersDirty) ||
    (location.pathname === "/profile/update" && isFormProfileUpdateDirty)
  ) {
    const promise = popup.show({
      title: "Выйти без сохранения?",
      message: "Если уйти сейчас, изменения в анкете будут потеряны.",
      buttons: [
        { id: "stay", type: "default", text: "Остаться" },
        { id: "exit", type: "destructive", text: "Выйти" },
      ],
    });
    const buttonId = await promise;
    buttonId === "exit" && navigate(-1);
  } else {
    navigate(-1);
  }
};

export function BackButton({
  isFormFiltersDirty,
  isFormProfileUpdateDirty,
}: PropsBackButton) {
  const location = useLocation();
  const navigate = useNavigate();

  useCheckBackButton()();

  const isTgButtonSupportingBackButton = useIsTgBackButtonSupporting();
  const isVisibleBackButton = useIsVisibleBackButton();

  const canShowHTMLButton =
    !isTgButtonSupportingBackButton && isVisibleBackButton;

  useTgBackButtonOnPressHandler(async () => {
    await navigationHandler(
      location,
      navigate,
      isFormFiltersDirty,
      isFormProfileUpdateDirty,
    );
  });
  useVisibleBackButtonHook(location);

  return (
    canShowHTMLButton && (
      <Button
        onClick={() => {
          onPressBackButtonHandler(async () => {
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
