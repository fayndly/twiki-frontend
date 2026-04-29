import styles from "./index.module.scss";
import {
  useIsVisibleButtonBack,
  useIsTgButtonBackSupporting,
  useCheckButtonBack,
} from "../model";
import {
  onPressButtonBackHandler,
  useTgButtonBackOnPressHandler,
  useVisibleButtonBackHook,
} from "../helpers";
import type { PropsButtonBack } from "../types";

import { Button } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { NavigateFunction, Location } from "react-router-dom";
import { popup } from "@tma.js/sdk";

import { paths } from "@/app/routes";

const navigationHandler = async (
  location: Location,
  navigate: NavigateFunction,
  isFormFiltersDirty?: boolean,
  isFormProfileUpdateDirty?: boolean,
) => {
  console.log(
    location.pathname === paths.pageProfileCardEdit && isFormProfileUpdateDirty,
  );

  if (
    (location.pathname === paths.pageFiltersEdit && isFormFiltersDirty) ||
    (location.pathname === paths.pageProfileCardEdit &&
      isFormProfileUpdateDirty)
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
    if (buttonId === "exit") {
      navigate(-1);
    }
  } else {
    navigate(-1);
  }
};

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
