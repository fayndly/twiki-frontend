import styles from "./index.module.scss";
import type { PropsInputText } from "../types";

import { Input } from "@telegram-apps/telegram-ui";

import { ButtonClear } from "@/shared/ui/buttons/ButtonClear";
import { useIsBase } from "@/app/store";
import { useEnterFocus } from "@/shared/helpers";

export function InputText({
  hasErrors,
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
      status={hasErrors ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
      placeholder={placeholder}
      after={
        typeof value === "string" && value.length > 0 ? (
          <ButtonClear onClick={clickClear} />
        ) : (
          ""
        )
      }
    />
  );
}
