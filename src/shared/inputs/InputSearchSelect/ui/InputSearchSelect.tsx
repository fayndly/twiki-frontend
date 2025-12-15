import { useState } from "react";

import styles from "./InputSearchSelect.module.scss";
import { type IPropsInputSearchSelect } from "../types/index.types";

import { sortValuesByMatch } from "../helpers/sortList";
import { Clue } from "../components/Clue/Clue";

import { Input } from "@telegram-apps/telegram-ui";

import { SubtitleInput } from "@/shared/inputs/SubtitleInput";
import { ClearButton } from "@/shared/inputs/ClearButton/ClearButton";

export function InputSearchSelect({
  handleChange,
  handleChangeClue,
  clickClear,
  errors,
  value,
  id,
  name,
  header,
  placeholder,
  subtitle,
  type,
  options,
  onChange,
}: IPropsInputSearchSelect) {
  const [clueValue, setClueValue] = useState("");
  const suggestions = sortValuesByMatch(options, clueValue);

  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = (event: "onFocus" | "onBlur") => {
    setTimeout(() => {
      event === "onFocus" && setIsFocused(true);
      event === "onBlur" && setIsFocused(false);
    }, 200);
  };

  return (
    <div className={styles.input_clue}>
      <Input
        onFocus={() => focusHandler("onFocus")}
        onBlur={() => focusHandler("onBlur")}
        id={id}
        name={name}
        type={type}
        status={errors?.length ? "error" : undefined}
        onChange={(e) => {
          onChange?.();
          handleChange(e);
          setClueValue(e.target.value);
        }}
        value={typeof value === "object" ? value?.label : value}
        header={header}
        placeholder={placeholder}
        after={
          typeof value === "object" ||
          (typeof value === "string" && value?.length > 0) ? (
            <ClearButton clickClear={clickClear} />
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
      <SubtitleInput errors={errors} subtitle={subtitle} />
    </div>
  );
}
