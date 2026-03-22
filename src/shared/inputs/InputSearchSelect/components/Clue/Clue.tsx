import styles from "./Clue.module.scss";
import type { PropsClue } from "../../types";

import { Cell, Section } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/shared/usePlatform";

export function Clue({ isVisible, suggestions, handleChangeClue }: PropsClue) {
  const isBase = useIsBase();

  return (
    <Section
      className={`${styles.clue} ${isBase ? styles.clue_wrapper_base : styles.clue_wrapper} ${!isVisible && styles.clue_hide}`}
    >
      {suggestions.length > 0 ? (
        suggestions.map((value) => {
          return (
            <Cell
              key={value.value}
              onClick={() => handleChangeClue(value)}
              subtitle={value.subtitle}
            >
              {value.label}
            </Cell>
          );
        })
      ) : (
        <Cell>Нет совпадений</Cell>
      )}
    </Section>
  );
}
