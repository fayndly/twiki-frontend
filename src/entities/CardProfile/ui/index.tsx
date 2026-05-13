import styles from "./index.module.scss";
import type { PropsCardProfile } from "../types";
import { InfoCard } from "./InfoCard";

import { ImageWithStatus } from "@/shared/ui/ImageWithStatus";

export function CardProfile({
  imgUrl,
  name,
  age,
  city,
  description,
  buttonAppeal,
  buttonLike,
  buttonDislike,
  className,
  onAnimationStart,
}: PropsCardProfile) {
  return (
    <article
      className={`${styles.card_profile} ${className}`}
      onAnimationStart={onAnimationStart}
    >
      <div className={styles.card_content}>
        <div className={styles.button_appeal_container}>{buttonAppeal}</div>
        <ImageWithStatus
          src={imgUrl}
          alt="img_profile"
          stylesContainerImg={styles.img_container}
          stylesImg={styles.img}
        />
        <div className={styles.info_container}>
          <InfoCard
            name={name}
            age={age}
            city={city}
            description={description}
          />
          <div className={styles.info_buttons}>
            {buttonLike}
            {buttonDislike}
          </div>
        </div>
      </div>
    </article>
  );
}
