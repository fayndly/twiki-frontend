import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSettings.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { backButton, themeParams, useSignal } from "@tma.js/sdk-react";
import { Divider, Subheadline, Text } from "@telegram-apps/telegram-ui";

import { type ICell } from "../types/index.types";
import { useEffect, useState } from "react";

const useGetTheme = () => {
  const [theme, setTheme] = useState<undefined | "dark" | "light">(undefined);
  const isDark = useSignal(themeParams.isDark);

  useEffect(() => {
    isDark ? setTheme("dark") : setTheme("light");
  }, [isDark]);

  return theme;
};

const MoveIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="10"
      height="17"
      viewBox="0 0 10 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.5L7.79289 7.79289C8.18342 8.18342 8.18342 8.81658 7.79289 9.20711L1.5 15.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export function PageSettings() {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useGetTheme();

  if (location.pathname === "/settings") {
    backButton.show();
  }

  function listener() {
    navigate("/viewing");
    backButton.hide();
    backButton.offClick(listener);
  }
  backButton.onClick(listener);

  return (
    <SectionWrapper>
      <section className={styles.section}>
        <div className={styles.section_settings}>
          <Subheadline className={styles.header} plain weight="3">
            НАСТРОЙКИ
          </Subheadline>
          <div
            className={`${styles.wrapper_settings} ${
              theme === "light" && styles.wrapper_settings_reverb
            }`}
          >
            <Cell
              title="Фильтры"
              moveTitle="Изменить"
              onClick={() => navigate("/filters/update")}
            />
            <Divider className={styles.divider} />
            <Cell
              title="Анкета"
              moveTitle="Редактировать"
              onClick={() => navigate("/profile/update")}
            />
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

const Cell = ({ title, moveTitle, onClick }: ICell) => {
  return (
    <div onClick={onClick} className={styles.cell}>
      <Text className={styles.cell_title} weight="3">
        {title}
      </Text>
      <div className={styles.cell_move}>
        <Text className={styles.cell_move_title} weight="3">
          {moveTitle}
        </Text>
        <MoveIcon className={styles.cell_move_icon} />
      </div>
    </div>
  );
};
