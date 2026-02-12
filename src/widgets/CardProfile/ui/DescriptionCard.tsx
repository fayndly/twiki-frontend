import styles from "./DescriptionCard.module.scss";
import type { PropsDescriptionCard } from "../types/index.types";

import { Text } from "@telegram-apps/telegram-ui";
import { useState } from "react";

import { supportHapticFeedback } from "@/shared/helpers";

export const DescriptionCard = ({
  name,
  age,
  city,
  description,
}: PropsDescriptionCard) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleClickDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
    supportHapticFeedback("soft");
  };

  return (
    <div onClick={handleClickDescription} className={styles.info_description}>
      <Text className={styles.text} weight="2">
        <span className={styles.text_name}>{name}</span>
        <span>,</span>
        <span className={styles.text_age}>{age}</span>
        <span className={styles.text_city}>{city}</span>
      </Text>
      <Text
        className={`${styles.description} ${
          isDescriptionOpen && styles.description_open
        }`}
        weight="3"
      >
        {description}
      </Text>
    </div>
  );
};
