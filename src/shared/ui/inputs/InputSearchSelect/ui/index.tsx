import styles from "./index.module.scss";
import type { PropsInputSearchSelect } from "../types";
import { sortValuesByMatch } from "../helpers";
import { Clue } from "./Clue";

import { useState } from "react";
import { Input } from "@telegram-apps/telegram-ui";

import { ButtonClear } from "@/shared/ui/buttons/ButtonClear";
import { useIsBase } from "@/app/store";
import { useEnterFocus } from "@/shared/helpers/";

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

  const handleEnterFocus = useEnterFocus();

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
        onKeyDown={handleEnterFocus}
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
            <ButtonClear onClick={clickClear} />
          ) : (
            ""
          )
        }
      />
      <Clue
        isVisible={isFocused}
        suggestions={suggestions}
        handleChangeClue={handleChangeClue}
      />
    </>
  );
}
