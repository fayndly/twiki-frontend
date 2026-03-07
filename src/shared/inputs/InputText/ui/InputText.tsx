import styles from "./InputText.module.scss";
import { type IPropsInputText } from "../types/index.types";

import { Input } from "@telegram-apps/telegram-ui";

import { ClearButton } from "@/shared/inputs/ClearButton";
import { useIsBase } from "@/shared/usePlatform";

export function InputText({
  hasError,
  handleChange,
  clickClear,
  value,
  id,
  name,
  header,
  placeholder,
  type,
  onChange,
}: IPropsInputText) {
  const isBase = useIsBase();
  return (
    <Input
      className={`${isBase ? styles.input_text_base : styles.input_text}`}
      id={id}
      name={name}
      type={type}
      status={hasError ? "error" : undefined}
      onChange={(e) => {
        onChange?.();
        handleChange(e);
      }}
      value={value}
      header={header}
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
