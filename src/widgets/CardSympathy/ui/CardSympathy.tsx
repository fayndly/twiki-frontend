import styles from "./CardSympathy.module.scss";

import { Text } from "@telegram-apps/telegram-ui";

import { type ICardSympathy } from "../types/index.types";
import { useEffect, useState } from "react";
import { themeParams, useSignal } from "@tma.js/sdk-react";

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
}: ICardSympathy) {
  const theme = useGetTheme();

  return (
    <div
      onClick={onClick}
      className={`${styles.card_sympathy} ${
        theme === "light" && styles.card_sympathy_light
      }`}
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
