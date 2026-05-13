import styles from "./index.module.scss";

import { Caption } from "@telegram-apps/telegram-ui";

import type { PropsInfo } from "../../types";

export function Info({ name, age, city }: PropsInfo) {
  return (
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
  );
}
