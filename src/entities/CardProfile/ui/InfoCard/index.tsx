import styles from "./index.module.scss";
import type { PropsDescriptionCard } from "../../types";

import { Caption, Subheadline, Text } from "@telegram-apps/telegram-ui";
import { useEffect, useRef, useState } from "react";

import { supportHapticFeedback } from "@/shared/helpers";

export const InfoCard = ({
  name,
  age,
  city,
  description,
}: PropsDescriptionCard) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  const handleClickDescription = () => {
    if (!isDescriptionOpen && !isOverflow) return;
    setIsDescriptionOpen(!isDescriptionOpen);
    supportHapticFeedback("soft");
  };

  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const checkOverflow = () => {
      setIsOverflow(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);

    observer.observe(el);

    return () => observer.disconnect();
  }, [description]);

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
        {description.length > 0 && (
          <span
            ref={ref}
            className={`${styles.info_description} ${
              isDescriptionOpen ? styles.info_description_open : ""
            }`}
          >
            <Caption weight="3">{description}</Caption>
          </span>
        )}
      </div>
    </div>
  );
};
