import type { PropsInputTextarea } from "../types/index.types";
import styles from "./InputTextarea.module.scss";

import { Textarea } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/shared/usePlatform";
import { useEnterFocus } from "@/app/helpers";

export function InputTextarea({
  hasError,
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
      status={hasError ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
      placeholder={placeholder}
    />
  );
}
