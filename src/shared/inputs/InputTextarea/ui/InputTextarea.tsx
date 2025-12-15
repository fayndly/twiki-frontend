import { Textarea } from "@telegram-apps/telegram-ui";

import styles from "./InputTextarea.module.scss";

import { type IPropsInputTextarea } from "../types/index.types";
import { SubtitleInput } from "@/shared/inputs/SubtitleInput";

export function InputTextarea({
  errors,
  handleChange,
  value,
  id,
  name,
  header,
  placeholder,
  subtitle,
  onChange,
}: IPropsInputTextarea) {
  return (
    <div className={styles.input_textarea}>
      <Textarea
        id={id}
        name={name}
        status={errors?.length ? "error" : undefined}
        onChange={(e) => {
          onChange?.();
          handleChange(e);
        }}
        value={value}
        header={header}
        placeholder={placeholder}
      />
      <SubtitleInput errors={errors} subtitle={subtitle} />
    </div>
  );
}
