import { useState } from "react";

import styles from "./InputSearchSelect.module.scss";
import type { PropsInputSearchSelect } from "../types";

import { sortValuesByMatch } from "../helpers/sortList";
import { Clue } from "../components/Clue/Clue";

import { Input } from "@telegram-apps/telegram-ui";

import { ClearButton } from "@/shared/inputs/ClearButton";
import { useIsBase } from "@/shared/usePlatform";

export function InputSearchSelect({
  handleChange,
  handleChangeClue,
  clickClear,
  hasErrors,
  value,
  id,
  name,
  placeholder,
  type,
  options,
  onChange,
}: PropsInputSearchSelect) {
  const [clueValue, setClueValue] = useState("");
  const suggestions = sortValuesByMatch(options, clueValue);
  const isBase = useIsBase();

  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = (event: "onFocus" | "onBlur") => {
    setTimeout(() => {
      event === "onFocus" && setIsFocused(true);
      event === "onBlur" && setIsFocused(false);
    }, 200);
  };

  return (
    <>
      <Input
        className={`${styles.input} ${!isBase && styles.input_search_select}`}
        onFocus={() => focusHandler("onFocus")}
        onBlur={() => focusHandler("onBlur")}
        id={id}
        name={name}
        type={type}
        status={hasErrors ? "error" : undefined}
        onChange={(e) => {
          onChange?.();
          handleChange(e);
          setClueValue(e.target.value);
        }}
        value={typeof value === "object" ? value?.label : value}
        placeholder={placeholder}
        after={
          typeof value === "object" ||
          (typeof value === "string" && value?.length > 0) ? (
            <ClearButton onClick={clickClear} />
          ) : (
            ""
          )
        }
      />
      <Clue
        isFocused={isFocused}
        suggestions={suggestions}
        handleChangeClue={handleChangeClue}
      />
    </>
  );
}
