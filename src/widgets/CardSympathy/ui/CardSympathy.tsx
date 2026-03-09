import styles from "./CardSympathy.module.scss";

import { Caption } from "@telegram-apps/telegram-ui";

import type { PropsCardSympathy } from "../types";
import { useState } from "react";
import { supportHapticFeedback } from "@/shared/helpers";
import { ImageWithStatus } from "@/shared/ImageWithStatus";

export function CardSympathy({
  onClick,
  imgUrl,
  name,
  age,
  city,
}: PropsCardSympathy) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    onClick?.();

    setActive(true);

    supportHapticFeedback("medium");

    setTimeout(() => {
      setActive(false);
    }, 200);
  };

  return (
    <article
      onClick={handleClick}
      className={`${styles.card_sympathy} ${active ? styles.card_sympathy_active : ""}`}
    >
      <ImageWithStatus
        src={imgUrl}
        alt="img_sympathy"
        stylesContainerImg={styles.img_container}
        stylesImg={styles.img}
      />
      <div className={styles.info_container}>
        <div className={styles.info}>
          <div className={styles.row}>
            <Caption className={styles.info_name} weight="2">
              {name}
            </Caption>
            <Caption className={styles.info_age} weight="2">
              {", " + age}
            </Caption>
          </div>
          <div className={styles.row}>
            <Caption className={styles.info_city} weight="2">
              {city}
            </Caption>
          </div>
        </div>
      </div>
    </article>
  );
}
