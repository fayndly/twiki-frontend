import styles from "./InputText.module.scss";
import type { PropsInputText } from "../types/index.types";

import { Input } from "@telegram-apps/telegram-ui";

import { ClearButton } from "@/shared/inputs/ClearButton";
import { useIsBase } from "@/shared/usePlatform";
import { useEnterFocus } from "@/app/helpers";

export function InputText({
  hasError,
  handleChange,
  clickClear,
  value,
  id,
  name,
  placeholder,
  type,
  onChange,
}: PropsInputText) {
  const isBase = useIsBase();
  const handleEnterFocus = useEnterFocus();

  return (
    <Input
      onKeyDown={handleEnterFocus}
      className={`${styles.input} ${!isBase && styles.input_text}`}
      id={id}
      name={name}
      type={type}
      status={hasError ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
      placeholder={placeholder}
      after={
        typeof value === "string" && value.length > 0 ? (
          <ClearButton onClick={clickClear} />
        ) : (
          ""
        )
      }
    />
  );
}
