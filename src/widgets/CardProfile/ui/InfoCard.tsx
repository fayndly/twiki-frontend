import styles from "./InfoCard.module.scss";
import type { PropsDescriptionCard } from "../types";

import { Caption, Subheadline, Text } from "@telegram-apps/telegram-ui";
import { useState } from "react";

import { supportHapticFeedback } from "@/shared/helpers";

export const InfoCard = ({
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
    <div onClick={handleClickDescription} className={styles.info_container}>
      <div className={styles.info}>
        <div>
          <div className={styles.row}>
            <Text className={styles.info_name} weight="2">
              {name}
            </Text>
            <Text className={styles.info_age} weight="2">
              {", " + age}
            </Text>
          </div>
          <div className={styles.row}>
            <Subheadline className={styles.info_city} weight="2">
              {city}
            </Subheadline>
          </div>
        </div>
        <Caption
          className={`${styles.info_description} ${
            isDescriptionOpen && styles.info_description_open
          }`}
          weight="3"
        >
          {description}
        </Caption>
      </div>
    </div>
  );
};
