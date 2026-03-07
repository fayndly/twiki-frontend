import type { PropsClue } from "../../types";
import { Cell, Section } from "@telegram-apps/telegram-ui";

import styles from "./Clue.module.scss";
import { useIsBase } from "@/shared/usePlatform";

export function Clue({ isFocused, suggestions, handleChangeClue }: PropsClue) {
  const isBase = useIsBase();

  return (
    isFocused && (
      <Section
        className={`${styles.clue}  ${isBase ? styles.clue_wrapper_base : styles.clue_wrapper}`}
      >
        {suggestions.length > 0 ? (
          suggestions.map((value) => {
            return (
              <Cell key={value.value} onClick={() => handleChangeClue(value)}>
                {value.label}
              </Cell>
            );
          })
        ) : (
          <Cell>Нет совпадений</Cell>
        )}
      </Section>
    )
  );
}
