import styles from "./index.module.scss";
import type { PropsInputTextarea } from "../types";

import { Textarea } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/app/store";
import { useEnterFocus } from "@/shared/helpers";

export function InputTextarea({
  hasErrors,
  handleChange,
  value,
  id,
  name,
  placeholder,
  onChange,
}: PropsInputTextarea) {
  const isBase = useIsBase();
  const handleEnterFocus = useEnterFocus();

  return (
    <Textarea
      onKeyDown={handleEnterFocus}
      className={`${styles.textarea} ${!isBase && styles.input_textarea}`}
      id={id}
      name={name}
      status={hasErrors ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
      placeholder={placeholder}
    />
  );
}
