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
      className={`${styles.select} ${!isBase && styles.input_select} ${value === "" && styles.select_placeholder}`}
      id={id}
      name={name}
      status={hasError ? "error" : undefined}
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
      {/* {options.map((value) => (
        <option disabled hidden key={value.value} value={value.value}>
          {value.label}
        </option>
        <option disabled hidden key={value.value} value={value.value}>
          {value.label}
        </option>
      ))} */}
    </Select>
  );
}
