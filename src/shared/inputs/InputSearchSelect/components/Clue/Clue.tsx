import type { IPropsClue } from "../../types/index.types";
import { Cell, Text } from "@telegram-apps/telegram-ui";

import styles from "./Clue.module.scss";

export function Clue({ isFocused, suggestions, handleChangeClue }: IPropsClue) {
  return (
    <div
      className={`${styles.clue_wrapper} ${
        isFocused ? styles.clue_active : ""
      }`}
    >
      <ul className={styles.clue_ul}>
        {suggestions.length > 0 ? (
          suggestions.map((value) => {
            return (
              <li key={value.value} className={styles.clue_li}>
                <Cell onClick={() => handleChangeClue(value)}>
                  {value.label}
                </Cell>
              </li>
            );
          })
        ) : (
          <div className={styles.clue_no_matches}>
            <Text>Нет совпадений</Text>
          </div>
        )}
      </ul>
    </div>
  );
}
