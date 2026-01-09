import styles from "./CardProfile.module.scss";

import { type IPropsCardProfile } from "../types/index.types";

import { IconButton, Text } from "@telegram-apps/telegram-ui";
import { hapticFeedback } from "@tma.js/sdk-react";
import { useState } from "react";

export function CardProfile({
  onLike,
  onDislike,
  imgUrl,
  name,
  age,
  city,
  description,
  isLiked,
  isDisliked,
  canRemove,
}: IPropsCardProfile) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleClickButton = (onClick?: () => void) => {
    onClick?.();

    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("light");
    }
  };

  const handleClickDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("soft");
    }
  };

  return (
    <div
      className={`${styles.card_profile} ${isLiked && styles.swipe_right} ${
        isDisliked && styles.swipe_left
      }`}
      onAnimationStart={() => {
        setTimeout(() => {
          canRemove();
        }, 300);
      }}
    >
      <img className={styles.img} src={imgUrl} alt="img_profile" />
      <div className={styles.info}>
        <div
          onClick={handleClickDescription}
          className={styles.info_description}
        >
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
        <div className={styles.info_buttons}>
          <IconButton
            className={styles.button}
            onClick={() => {
              handleClickButton(onLike);
            }}
            mode="plain"
            size="l"
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.9018 10.9945C27.9042 10.5665 27.8819 10.1381 27.8349 9.7116L27.828 9.6485C27.7393 8.84257 27.4427 8.07441 26.968 7.42107C26.4566 6.7173 25.7346 6.19915 24.9091 5.94353L24.5092 5.81971C23.9488 5.64618 23.3598 5.58778 22.7767 5.64796L22.6947 5.65643C21.6899 5.76014 20.7528 6.21646 20.0458 6.94623L19.9047 7.09185C19.721 7.28145 19.5655 7.49703 19.443 7.73184L17.8635 10.7596L15.8788 14.9218H12.8062C7.80459 14.9218 3.75 19.0245 3.75 24.0855V30.2114C3.75 35.2723 7.80459 39.375 12.8062 39.375H30.0853C35.2238 39.375 39.5842 35.5602 40.3266 30.4153L41.1603 24.637C41.8994 19.5149 37.9748 14.9218 32.8591 14.9218H27.4554C27.4476 14.9218 27.4415 14.9148 27.4426 14.9069L27.6926 13.1008L27.7387 12.8342C27.8425 12.2344 27.8968 11.6276 27.9016 11.0201C27.9017 11.0116 27.9017 11.0031 27.9018 10.9945ZM21.3286 12.5301L18.3155 18.8491H12.8062C9.94812 18.8491 7.63122 21.1935 7.63122 24.0855V30.2114C7.63122 33.1033 9.94813 35.4477 12.8062 35.4477H30.0853C33.2968 35.4477 36.0221 33.0635 36.4861 29.8479L37.3198 24.0696C37.717 21.3172 35.6081 18.8491 32.8591 18.8491H27.4554C25.09 18.8491 23.2708 16.7326 23.5989 14.3622L23.8581 12.4897L23.9156 12.157C24.0305 11.4932 24.0513 10.8162 23.9776 10.1464L23.9706 10.0833C23.9573 9.96178 23.9125 9.84594 23.841 9.74743C23.8242 9.72431 23.8004 9.70729 23.7733 9.69889L23.3735 9.57508C23.3079 9.55476 23.2389 9.54792 23.1706 9.55497L23.0886 9.56344C22.9857 9.57405 22.8897 9.62077 22.8174 9.69548L22.7957 9.71783L21.3286 12.5301Z"
                fill="#1BCE13"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7468 35.4477V18.8491H18.3155V35.4477H14.7468Z"
                fill="#1BCE13"
              />
            </svg>
          </IconButton>
          <IconButton
            className={styles.button}
            onClick={() => {
              handleClickButton(onDislike);
            }}
            mode="plain"
            size="l"
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0982 34.0055C17.0958 34.4335 17.1181 34.8619 17.1651 35.2884L17.172 35.3515C17.2607 36.1574 17.5573 36.9256 18.032 37.5789C18.5434 38.2827 19.2654 38.8009 20.0909 39.0565L20.4908 39.1803C21.0512 39.3538 21.6402 39.4122 22.2233 39.352L22.3053 39.3436C23.3101 39.2399 24.2472 38.7835 24.9542 38.0538L25.0953 37.9082C25.279 37.7185 25.4345 37.503 25.557 37.2682L27.1365 34.2404L29.1212 30.0782L32.1938 30.0782C37.1954 30.0782 41.25 25.9755 41.25 20.9145L41.25 14.7886C41.25 9.7277 37.1954 5.625 32.1938 5.625L14.9147 5.625C9.77621 5.625 5.41578 9.43977 4.67341 14.5847L3.83966 20.363C3.10058 25.4851 7.0252 30.0782 12.1409 30.0782L17.5446 30.0782C17.5524 30.0782 17.5585 30.0852 17.5574 30.0931L17.3074 31.8992L17.2613 32.1658C17.1575 32.7656 17.1032 33.3724 17.0984 33.9799C17.0983 33.9884 17.0983 33.9969 17.0982 34.0055ZM23.6714 32.4699L26.6845 26.1509L32.1938 26.1509C35.0519 26.1509 37.3688 23.8065 37.3688 20.9145L37.3688 14.7886C37.3688 11.8967 35.0519 9.55228 32.1938 9.55228L14.9147 9.55228C11.7032 9.55228 8.97789 11.9365 8.51391 15.1521L7.68016 20.9304C7.28301 23.6828 9.39193 26.1509 12.1409 26.1509L17.5446 26.1509C19.91 26.1509 21.7292 28.2674 21.4011 30.6378L21.1419 32.5103L21.0844 32.843C20.9695 33.5068 20.9487 34.1838 21.0224 34.8536L21.0294 34.9167C21.0427 35.0382 21.0875 35.1541 21.159 35.2526C21.1758 35.2757 21.1996 35.2927 21.2267 35.3011L21.6265 35.4249C21.6921 35.4452 21.7611 35.4521 21.8294 35.445L21.9114 35.4366C22.0143 35.4259 22.1103 35.3792 22.1826 35.3045L22.2043 35.2822L23.6714 32.4699Z"
                fill="#CE4E13"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.2532 9.55228L30.2532 26.1509L26.6845 26.1509L26.6845 9.55228L30.2532 9.55228Z"
                fill="#CE4E13"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
