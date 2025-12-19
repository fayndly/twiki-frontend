import styles from "./InputRange.module.scss";

import { InputText } from "@/shared/inputs/InputText";

import { Subheadline } from "@telegram-apps/telegram-ui";
import { SubtitleInput } from "../../SubtitleInput";

interface Double {
  first: string;
  last: string;
}

interface PropsInputRange {
  setFieldTouched: any;
  firstValue: any;
  lastValue: any;
  handleChange: any;
  id: Double;
  name: Double;
  header: Double;
  placeholder: Double;
  subtitle: string;
  errors: Double;
}

export function InputRange({
  setFieldTouched,
  firstValue,
  lastValue,
  handleChange,
  id,
  name,
  header,
  placeholder,
  subtitle,
  errors,
}: PropsInputRange) {
  const getErrors = errors.first || errors.last;

  return (
    <div className={styles.range_age}>
      <Subheadline className={styles.range_age_header} plain weight="3">
        Возраст
      </Subheadline>
      <div className={styles.range_age_wrapper}>
        <InputText
          onChange={() => {
            setFieldTouched(id.first, true);
          }}
          handleChange={handleChange}
          value={firstValue}
          type="number"
          id={id.first}
          name={name.first}
          header={header.first}
          placeholder={placeholder.first}
          errors={errors.first}
          showSubtitle={false}
        />
        <InputText
          onChange={() => {
            setFieldTouched(id.last, true);
          }}
          handleChange={handleChange}
          value={lastValue}
          type="number"
          id={id.last}
          name={name.last}
          header={header.last}
          placeholder={placeholder.last}
          errors={errors.last}
          showSubtitle={false}
        />
      </div>
      <SubtitleInput errors={getErrors} subtitle={subtitle} />
    </div>
  );
}
