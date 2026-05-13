import styles from "./index.module.scss";
import type { PropsCardSympathy } from "../types";
import { Info } from "./Info";

import { useState } from "react";

import { supportHapticFeedback } from "@/shared/helpers";
import { ImageWithStatus } from "@/shared/ui/ImageWithStatus";

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
      <Info name={name} age={age} city={city} />
    </article>
  );
}
