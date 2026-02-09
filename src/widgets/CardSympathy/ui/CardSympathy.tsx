import styles from "./CardSympathy.module.scss";

import { Text } from "@telegram-apps/telegram-ui";

import { type IPropsCardSympathy } from "../types/index.types";
import { useEffect, useState } from "react";
import { themeParams, useSignal } from "@tma.js/sdk-react";
import { supportHapticFeedback } from "@/shared/helpers/supportHapticFeedback";

const useGetTheme = () => {
  const [theme, setTheme] = useState<undefined | "dark" | "light">(undefined);
  const isDark = useSignal(themeParams.isDark);

  useEffect(() => {
    isDark ? setTheme("dark") : setTheme("light");
  }, [isDark]);

  return theme;
};

export function CardSympathy({
  onClick,
  imgUrl,
  name,
  age,
  city,
}: IPropsCardSympathy) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    onClick?.();

    setActive(true);

    supportHapticFeedback("medium");

    setTimeout(() => {
      setActive(false);
    }, 200);
  };

  const theme = useGetTheme();

  return (
    <div
      onClick={handleClick}
      className={`${styles.card_sympathy} 
      ${
        theme === "light"
          ? styles.card_sympathy_light
          : styles.card_sympathy_dark
      } 
      ${active ? styles.card_sympathy_active : ""}`}
    >
      <img className={styles.img} src={imgUrl} alt="img_sympathy" />
      <div className={styles.title}>
        <Text className={styles.text} weight="2">
          <span className={styles.text_name}>{name}</span>
          <span>,</span>
          <span className={styles.text_age}>{age}</span>
          <span className={styles.text_city}>{city}</span>
        </Text>
      </div>
    </div>
  );
}
