import styles from "./index.module.scss";
import type { PropsCardProfileWithActions } from "../types";
import { timeoutAnimation } from "../config";

import { CardProfile } from "@/entities/CardProfile";
import { ButtonAppeal } from "@/features/appeal-profile";
import { ButtonReaction } from "@/features/reaction-profile";

export function CardProfileWithActions({
  imgUrl,
  name,
  age,
  city,
  description,
  isLiked,
  isDisliked,
  isAppealed,
  canRemove,
  id,
  mutations,
  from,
}: PropsCardProfileWithActions) {
  return (
    <CardProfile
      imgUrl={imgUrl}
      name={name}
      age={age}
      city={city}
      description={description}
      className={`${isLiked && styles.swipe_right} ${
        isDisliked && styles.swipe_left
      } ${isAppealed && styles.swipe_bottom}`}
      onAnimationStart={() => {
        setTimeout(() => {
          canRemove();
        }, timeoutAnimation);
      }}
      buttonAppeal={<ButtonAppeal cardId={id} from={from} />}
      buttonLike={<ButtonReaction type="like" id={id} mutations={mutations} />}
      buttonDislike={
        <ButtonReaction type="dislike" id={id} mutations={mutations} />
      }
    />
  );
}
