import styles from "./index.module.scss";
import type { PropsInputSelect } from "../types";

import { Select } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/app/store";

export function InputSelect({
  hasErrors,
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
      className={`${styles.select} ${!isBase && styles.input_select} ${value === "" && styles.select_placeholder}`}
      id={id}
      name={name}
      status={hasErrors ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
    >
      {options.map((value) =>
        value.value === "" ? (
          <option disabled hidden key={value.value} value={value.value}>
            {value.label}
          </option>
        ) : (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ),
      )}
    </Select>
  );
}
