import styles from "./InputSelect.module.scss";
import { type IPropsInputSelect } from "../types/index.types";

import { Select } from "@telegram-apps/telegram-ui";

import { SubtitleInput } from "@/shared/inputs/SubtitleInput";

export function InputSelect({
  errors,
  handleChange,
  value,
  id,
  name,
  header,
  subtitle,
  options,
  onChange,
}: IPropsInputSelect) {
  return (
    <div className={styles.input_select}>
      <Select
        id={id}
        name={name}
        status={errors?.length ? "error" : undefined}
        onChange={(e) => {
          onChange?.();
          handleChange(e);
        }}
        value={value}
        header={header}
      >
        {options.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </Select>
      <SubtitleInput errors={errors} subtitle={subtitle} />
    </div>
  );
}
