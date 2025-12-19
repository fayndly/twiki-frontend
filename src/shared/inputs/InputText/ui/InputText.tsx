import styles from "./InputText.module.scss";
import { type IPropsInputText } from "../types/index.types";

import { Input } from "@telegram-apps/telegram-ui";

import { SubtitleInput } from "@/shared/inputs/SubtitleInput";
import { ClearButton } from "@/shared/inputs/ClearButton/ClearButton";

export function InputText({
  errors,
  handleChange,
  clickClear,
  value,
  id,
  name,
  header,
  placeholder,
  subtitle,
  type,
  onChange,
  showSubtitle = true,
}: IPropsInputText) {
  return (
    <div className={styles.input_text}>
      <Input
        id={id}
        name={name}
        type={type}
        status={errors?.length ? "error" : undefined}
        onChange={(e) => {
          onChange?.();
          handleChange(e);
        }}
        value={value}
        header={header}
        placeholder={placeholder}
        after={
          typeof value === "string" && value.length > 0 ? (
            <ClearButton clickClear={clickClear} />
          ) : (
            ""
          )
        }
      />
      {showSubtitle && <SubtitleInput errors={errors} subtitle={subtitle} />}
    </div>
  );
}
