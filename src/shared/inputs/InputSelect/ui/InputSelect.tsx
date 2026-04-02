import styles from "./InputSelect.module.scss";
import type { PropsInputSelect } from "../types/index.types";

import { Select } from "@telegram-apps/telegram-ui";
import { useIsBase } from "@/shared/usePlatform";

export function InputSelect({
  hasError,
  handleChange,
  value,
  id,
  name,
  options,
  onChange,
}: PropsInputSelect) {
  const isBase = useIsBase();

  return (
    <Select
      className={`${styles.select} ${!isBase && styles.input_select}`}
      id={id}
      name={name}
      status={hasError ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
    >
      {options.map((value) => (
        <option key={value.value} value={value.value}>
          {value.label}
        </option>
      ))}
    </Select>
  );
}
