import styles from "./CardProfile.module.scss";
import type { PropsCardProfile } from "../types/index.types";
import { ButtonReaction } from "./ButtonReaction";
import { ButtonAppeal } from "./ButtonAppeal";
import { DescriptionCard } from "./DescriptionCard";

import { ImageWithStatus } from "./ImageWithStatus";

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
        <ImageWithStatus src={imgUrl} />
        <div className={styles.info}>
          <DescriptionCard
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
