import styles from "./CardProfile.module.scss";
import type { PropsCardProfile } from "../types";
import { ButtonReaction } from "./ButtonReaction";
import { ButtonAppeal } from "./ButtonAppeal";
import { InfoCard } from "./InfoCard";

import { ImageWithStatus } from "@/shared/ImageWithStatus";

export function CardProfile({
  onClickButtonLike,
  onClickButtonDislike,
  onClickButtonAppeal,
  imgUrl,
  name,
  age,
  city,
  description,
  isLiked,
  isDisliked,
  isAppealed,
  canRemove,
}: PropsCardProfile) {
  return (
    <div
      className={`${styles.card_profile} ${isLiked && styles.swipe_right} ${
        isDisliked && styles.swipe_left
      } ${isAppealed && styles.swipe_bottom}`}
      onAnimationStart={() => {
        setTimeout(() => {
          canRemove();
        }, 300);
      }}
    >
      <div className={styles.card_content}>
        <ButtonAppeal onClick={() => onClickButtonAppeal?.()} />
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
            <ButtonReaction onClick={() => onClickButtonLike?.()} type="like" />
            <ButtonReaction
              onClick={() => onClickButtonDislike?.()}
              type="dislike"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
